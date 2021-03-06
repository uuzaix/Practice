var list = document.getElementById('todo_list');
var addButton = document.getElementById("addButton");
var storageLength = localStorage.length;
var newInput = document.getElementById('input').value;

var count = 0;

if (!localStorage.getItem('max')) {
	localStorage.setItem("max", "0");
}

var maxId = parseInt(localStorage.getItem('max'));

function createList (addId, elementValue, checkBoxState) {
	count ++;
	var element = document.createElement("li");
	var deleteButton = document.createElement("input");
	var checkBox = document.createElement("input");

	if (elementValue == "") {
		return;
	}

	element.id = addId;
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
		updateStorage();
	}

	function updateStorage() {
		// localStorage.setItem(element.id, JSON.stringify([updateValue[0],checkBox.checked]));
		dataToSent = JSON.stringify({"id":element.id, "done":checkBox.checked});
		makeRequest('PUT', 'http://localhost:5000/api/todos/'+ element.id, dataToSent);
	}

	deleteButton.onclick = function() {
		element.parentNode.removeChild(element);
		// localStorage.removeItem(element.id);
		makeRequest('DELETE', 'http://localhost:5000/api/todos/'+ element.id, null);
	}
	// document.getElementById('input').value = ''
}




function addList() {
	newInput = document.getElementById('input').value;
	// var newId = parseInt(localStorage.getItem('max'));
	// createList(newId+1, newInput, false);
	var sent_data = JSON.stringify({"text":newInput, "done":false});
	var a = makeRequest('POST', 'http://localhost:5000/api/todos', sent_data);
	var new_task = JSON.parse(a);
	createList(new_task.id, new_task.text, new_task.done);
}

addButton.onclick = addList;

document.onkeydown = function() {
	if (window.event.keyCode == '13') {
		addList();
	}
}

window.onload = function() {
	var tasks = JSON.parse(makeRequest('GET', 'http://localhost:5000/api/todos', null)).tasks;
	if (tasks.length > 0){ 
		for (i=0; i < tasks.length; i++) {
			var task = tasks[i];
			createList(task.id, task.text, task.done);
		}
	}
}

function makeRequest(method, url, data) {
	console.log(method);
	console.log(url);
	console.log(data);
	if (window.XMLHttpRequest) {
		httpRequest = new XMLHttpRequest();
		// console.log(httpRequest);
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
	// httpRequest.onreadystatechange = alertContents;
	httpRequest.open(method, url, false);
	// httpRequest.setRequestHeader('Content-Type', 'application/json');
	httpRequest.send(data);
	var response = httpRequest.responseText;
	console.log(typeof httpRequest.responseText);
	console.log(httpRequest.responseText);
	return response;
}


// function alertContents() {
// 	if (httpRequest.readyState === 4) {
// 		console.log ('4')
// 		if (httpRequest.status === 200) {
// 			console.log ('200')
// 			alert(httpRequest.responseText);
// 		} else {
// 			alert('There was a problem with the request.');
// 		}
// 	}
// }

