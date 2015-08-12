var restBackend = {
	url : 'http://localhost:5000/api/todos',

	makeRequest : function(method, url, data) {
		var response = $.ajax({
			async: false,
			url: url,
			method: method,
			data: data,
			dataType: "text",
			contentType:"application/json",
		});
		return response.responseText;
	},

	deleteTask : function(id) {
		this.makeRequest('DELETE', this.url + "/" + id, null); 
	},
	modifyTask : function(id, checkBoxState) {
		dataToSent = JSON.stringify({"id":id, "done":checkBoxState});
		this.makeRequest('PUT', this.url + "/" + id, dataToSent);
	},
	getAllTasks : function() {
		var response = this.makeRequest('GET', this.url, null);
		var tasks = JSON.parse(response).tasks;
		return tasks;
	},
	createTask : function(taskValue) {
		var dataToSent = JSON.stringify({"text":taskValue, "done":false});
		var response = this.makeRequest('POST', this.url, dataToSent);
		var newTask = JSON.parse(response);
		return newTask;
	}
}

var backend = restBackend;

function createCheckBox(checkBoxState) {
	var checkBox = document.createElement("input");
	checkBox.setAttribute("type", "checkbox");
	checkBox.checked = checkBoxState;
	return checkBox;
}

function createDeleteButton() {
	var deleteButton = document.createElement("input");
	deleteButton.setAttribute("type", "submit");
	deleteButton.setAttribute("value", "Delete");
	deleteButton.setAttribute("class", "btn btn-warning btn-xs");
	return deleteButton;
}

function createTodoItem (id, taskValue, checkBoxState) {
	var list = document.getElementById('todo_list');
	var task = document.createElement("li");
	task.id = id;

	if (taskValue == "") {
		return;
	}

	var checkBox = createCheckBox(checkBoxState);
	var deleteButton = createDeleteButton();

	task.appendChild(checkBox);
	task.appendChild(document.createTextNode(taskValue));
	task.appendChild(deleteButton);
	list.appendChild(task);

	if (checkBox.checked) {
		task.setAttribute("class", "lineThrough");
	}

	checkBox.onclick = function() {
		if (checkBox.checked) {
			task.setAttribute("class", "lineThrough");
		}
		else {
			task.setAttribute("class", "normal");
		}
		backend.modifyTask(task.id, checkBox.checked);
	}

	function deleteTask() {
		task.parentNode.removeChild(task);
		backend.deleteTask(task.id);
	}

	deleteButton.onclick = deleteTask;

	clearInput();
}

function clearInput() {
	document.getElementById('input').value = '';
}

window.onload = function() {
	var tasks = backend.getAllTasks();
	if (tasks.length > 0){ 
		for (i=0; i < tasks.length; i++) {
			var task = tasks[i];
			createTodoItem(task.id, task.text, task.done);
		}
	}
}

function createTask() {
	var taskValue = document.getElementById('input').value;
	var newTask = backend.createTask(taskValue);
	createTodoItem(newTask.id, newTask.text, newTask.done);
}

var addButton = document.getElementById("addButton");

addButton.onclick = createTask;

document.onkeydown = function() {
	if (window.event.keyCode == '13') {
		createTask();
	}
}