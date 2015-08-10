
var url = 'http://localhost:5000/api/todos'

function makeRequest(method, url, data) {
	var response = $.ajax({
		async: false,
		url: url,
		method: method,
		data: data,
		dataType: "text",
		contentType:"application/json",
	});
	return response.responseText;
}

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

function createList (id, taskValue, checkBoxState) {
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
		modifyTask(task.id, checkBox.checked);
	}

	function deleteTask() {
		task.parentNode.removeChild(task);
		makeRequest('DELETE', url + "/" + task.id, null);
	}

	deleteButton.onclick = deleteTask;

	document.getElementById('input').value = ''
}

function modifyTask(id, checkBoxState) {
	var dataToSent = JSON.stringify({"id":id, "done":checkBoxState});
	makeRequest('PUT', url + "/" + id, dataToSent);
}

function getAllTasksFromBackend() {
	var response = makeRequest('GET', url, null);
	var tasks = JSON.parse(response).tasks;
	return tasks;
}

window.onload = function(){
	var tasks = getAllTasksFromBackend();
	if (tasks.length > 0){ 
		for (i=0; i < tasks.length; i++) {
			var task = tasks[i];
			createList(task.id, task.text, task.done);
		}
	}
}

function createTaskOnBackend(taskValue) {
	var dataToSent = JSON.stringify({"text":taskValue, "done":false});
	var response = makeRequest('POST', url, dataToSent);
	var newTask = JSON.parse(response);
	return newTask;
}

function createTask(){
	var taskValue = document.getElementById('input').value;
	var newTask = createTaskOnBackend(taskValue);
	createList(newTask.id, newTask.text, newTask.done);
}

var addButton = document.getElementById("addButton");

addButton.onclick = createTask;

document.onkeydown = function() {
	if (window.event.keyCode == '13') {
		createTask();
	}
}