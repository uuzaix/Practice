#!flask/bin/python
from datetime import timedelta
from flask import Flask, jsonify, make_response, request, current_app
import traceback
from functools import update_wrapper

def crossdomain(origin=None, methods=None, headers=None, max_age=21600, attach_to_all=True, automatic_options=True):
	if methods is not None:
		methods = ', '.join(sorted(x.upper() for x in methods))
	if headers is not None and not isinstance(headers, basestring):
		headers = ', '.join(x.upper() for x in headers)
	if not isinstance(origin, basestring):
		origin = ', '.join(origin)
	if isinstance(max_age, timedelta):
		max_age = max_age.total_seconds()

	def get_methods():
		if methods is not None:
			return methods

		options_resp = current_app.make_default_options_response()
		return options_resp.headers['allow']

	def decorator(f):
		def wrapped_function(*args, **kwargs):
			if automatic_options and request.method == 'OPTIONS':
				resp = current_app.make_default_options_response()
			else:
				resp = make_response(f(*args, **kwargs))
			if not attach_to_all and request.method != 'OPTIONS':
				return resp

			h = resp.headers

			h['Access-Control-Allow-Origin'] = origin
			h['Access-Control-Allow-Methods'] = get_methods()
			h['Access-Control-Max-Age'] = str(max_age)
			if headers is not None:
				h['Access-Control-Allow-Headers'] = headers
			return resp

		f.provide_automatic_options = False
		return update_wrapper(wrapped_function, f)
	return decorator

app = Flask(__name__)

tasks = [
	{
		'id' : 1,
		"text" : "asdf",
		"done" : False
	},
	{
		"id" : 2,
		"text" : "qwert",
		"done" : True
}
]
# curl -i -H "Content-type: application/json" -X GET http://localhost:5000/api/todos
@app.route('/api/todos', methods = ['GET', 'OPTIONS'])
@crossdomain(origin='*')
def get_tasks():
	return jsonify({"tasks":tasks})

# curl -i -H "Content-type: application/json" -X DELETE http://localhost:5000/api/todos/2
@app.route('/api/todos/<int:task_id>', methods = ['GET','DELETE'])
@crossdomain(origin='*')
def delete_task(task_id):
	task = [task for task in tasks if task['id'] == task_id]
	tasks.remove(task[0])
	return jsonify({'result' : True})

# curl -i -H "Content-type: application/json" -X POST -d '{"text":"abc", "done":true}' http://localhost:5000/api/todos
@app.route('/api/todos', methods = ['POST'])
@crossdomain(origin='*')
def add_task():
	data = request.get_json()
	_id = tasks[-1]['id'] + 1
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
@app.route('/api/todos/<int:task_id>', methods = ['PUT'])
@crossdomain(origin='*')
def update_task(task_id):
	data = request.get_json()
	for task in tasks:
		if task['id'] == task_id:
			current_task = task
	print current_task, data
	current_task['text'] = data['text']
	current_task['done'] = data['done']
	return jsonify(task)



@app.errorhandler(404)
@crossdomain(origin='*')
def not_found(error):
	return make_response(jsonify({'error':'Not found'}), 404)


@app.route('/messages', methods = ['POST'])
@crossdomain(origin='*')
def api_message():

	if request.headers['Content-Type'] == 'application/json':
		return "JSON Message: " + json.dumps(request.json)



if __name__ == '__main__':
	app.run(debug=True)