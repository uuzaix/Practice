function makeRequest(method, url, data) {
	if (window.XMLHttpRequest) {
		var httpRequest = new XMLHttpRequest();
	}
	else if (window.ActiveXObject) {
		try {
			httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} 
		catch (e) {
			try {
				httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} 
			catch (e) {}
		}
	}
	if (!httpRequest) {
		alert('Giving up :( Cannot create an XMLHTTP instance');
			return false;
		}

	httpRequest.open(method, url, false);
	httpRequest.setRequestHeader('Content-Type', 'application/json');
	httpRequest.send(data);
	var response = httpRequest.responseText;
	return response;
}

function createList (id, elementValue, checkBoxState) {
	var list = document.getElementById('todo_list');
	var element = document.createElement("li");
	var checkBox = document.createElement("input");
	var deleteButton = document.createElement("input");

	if (elementValue == "") {
		return;
	}

	element.id = id;
	checkBox.setAttribute("type", "checkbox");
	checkBox.checked = checkBoxState;
	checkBox.style.margin = '5px';

	deleteButton.setAttribute("type", "submit");
	deleteButton.setAttribute("value", "Delete");
	deleteButton.setAttribute("class", "btn btn-warning btn-xs");
	deleteButton.style.margin = '5px 15px';

	element.appendChild(checkBox);
	element.appendChild(document.createTextNode(elementValue));
	element.appendChild(deleteButton);
	list.appendChild(element);

	if (checkBox.checked) {
		element.setAttribute("class", "lineThrough");
	}

	checkBox.onclick = function() {
		if (checkBox.checked) {
			element.setAttribute("class", "lineThrough");
		}
		else {
			element.setAttribute("class", "normal");
		}
		updateTask();
	}

	function updateTask() {
		var dataToSent = JSON.stringify({"id":element.id, "done":checkBox.checked});
		makeRequest('PUT', 'http://localhost:5000/api/todos/'+ element.id, dataToSent);
	}

	deleteButton.onclick = function() {
		element.parentNode.removeChild(element);
		makeRequest('DELETE', 'http://localhost:5000/api/todos/'+ element.id, null);
	}

	document.getElementById('input').value = ''
}

window.onload = function() {
	var response = makeRequest('GET', 'http://localhost:5000/api/todos', null);
	var tasks = JSON.parse(response).tasks;
	if (tasks.length > 0){ 
		for (i=0; i < tasks.length; i++) {
			var task = tasks[i];
			createList(task.id, task.text, task.done);
		}
	}
}

function addNewTask() {
	var input = document.getElementById('input').value;
	var dataToSent = JSON.stringify({"text":input, "done":false});
	var response = makeRequest('POST', 'http://localhost:5000/api/todos', dataToSent);
	var newTask = JSON.parse(response);
	createList(newTask.id, newTask.text, newTask.done);
}

var addButton = document.getElementById("addButton");

addButton.onclick = addNewTask;

document.onkeydown = function() {
	if (window.event.keyCode == '13') {
		addNewTask();
	}
}