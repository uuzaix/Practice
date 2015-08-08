#!flask/bin/python
from flask import Flask, jsonify, make_response, request, send_from_directory

app = Flask(__name__, static_url_path='')

@app.route('/scripts')
def send_js(path):
	return send_from_directory('scripts', path)

@app.route('/styles')
def send_style(path):
	return send_from_directory('styles', path)

@app.route('/')
def root():
	return app.send_static_file('index.html')

tasks = [
	{
		'id' : 1,
		"text" : "foo",
		"done" : False
	},
	{
		"id" : 2,
		"text" : "bar",
		"done" : True
}
]

# curl -i -H "Content-type: application/json" -X GET http://localhost:5000/api/todos
@app.route('/api/todos', methods = ['GET'])
def get_tasks():
	return jsonify({"tasks":tasks})

# curl -i -H "Content-type: application/json" -X DELETE http://localhost:5000/api/todos/2
@app.route('/api/todos/<int:task_id>', methods = ['DELETE'])
def delete_task(task_id):
	task = [task for task in tasks if task['id'] == task_id]
	tasks.remove(task[0])
	return jsonify({'result' : True})

# curl -i -H "Content-type: application/json" -X POST -d '{"text":"abc", "done":true}' http://localhost:5000/api/todos
@app.route('/api/todos', methods = ['POST'])
def add_task():
	data = request.get_json()
	if tasks != []:
		_id = tasks[-1]['id'] + 1
	else:
		_id = 1
	_text = data["text"]
	_done = data["done"]
	task = {
	"id" : _id,
	"text" : _text,
	"done" : _done
	}
	tasks.append(task)
	return jsonify(task), 201

# curl -i -H "Content-type: application/json" -X PUT -d '{"text":"abc", "done":true}' http://localhost:5000/api/todos/2
@app.route('/api/todos/<int:task_id>', methods = ['PUT','OPTIONS'])
def update_task(task_id):
	data = request.get_json()
	for task in tasks:
		if task['id'] == task_id:
			current_task = task
	current_task['done'] = data['done']
	return jsonify(task)

@app.errorhandler(404)
def not_found(error):
	return make_response(jsonify({'error':'Not found'}), 404)

@app.route('/messages', methods = ['POST'])
def api_message():
	if request.headers['Content-Type'] == 'application/json':
		return "JSON Message: " + json.dumps(request.json)

if __name__ == '__main__':
	app.run(debug=True)