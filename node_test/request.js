var request = require('superagent');
request
.get('http://localhost:5000/api/todos')
.send({ name: 'Manny', species: 'cat' })
.set('X-API-Key', 'foobar')
.set('Accept', 'application/json')
.end(function(err, res){
	if (res.ok) {
		var id = res.body.tasks[0].id
		console.log(res.body, id);
		request.del('http://localhost:5000/api/todos/'+id).set('Accept', 'application/json').end(function(err, res){
			if (res.ok) {
				console.log("Deleted " + id);
			}
			else {
				console.log(err);
			}
		})

	}
	else {
		console.log(err);
	}
    // Calling the end function will send the request
});
console.log("Reached end of file")