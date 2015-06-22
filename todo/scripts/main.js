var addButton =  document.getElementById('button');
var list = document.getElementById('todo-list');
var storageLength = localStorage.length;
var newInput;
var maxId;

if (localStorage.length == 0) {
	localStorage.setItem('max', 0);
}

var maxStorageId = parseInt(localStorage.getItem('max'));

function addToList(newId, addInput, checkedStatus) {
	var li = document.createElement('li');
	var checkBox = document.createElement("input");
	var deleteButton = document.createElement("input");

	if (addInput == '') {
		return;
	}

	li.id = newId + '_li';

	checkBox.type = 'checkbox';
	checkBox.checked = checkedStatus;
	checkBox.style.margin = '5px';
	
	deleteButton.type = 'submit';
	deleteButton.value = "Delete";
	deleteButton.style.margin = '5px 15px';

	li.appendChild(checkBox);
	li.appendChild(document.createTextNode(addInput));
	li.appendChild(deleteButton);

	list.appendChild(li);

	if (checkBox.checked) {
		li.setAttribute("class", "lineThrough");
	}

	function writeStorage() {
		localStorage.setItem(li.id,JSON.stringify([addInput, checkBox.checked]));
		localStorage.setItem('max',newId);
	}

	writeStorage();

	function updateStorage() {
		currentStateString = localStorage.getItem(li.id);
		currentStateList = JSON.parse(currentStateString);
		currentStateList = [currentStateList[0], checkBox.checked];
		localStorage.setItem(li.id,JSON.stringify(currentStateList));
	}

	checkBox.onclick = function() {
		if (checkBox.checked) {
			li.setAttribute("class", "lineThrough");
		}
		else {
			li.setAttribute("class", "normal");
		}
		updateStorage();
	}

	deleteButton.onclick = function() {
		li.parentNode.removeChild(li);
		localStorage.removeItem(li.id);
	}
	newInput = null;
}

addButton.onclick = function() {
	newInput = document.getElementById('input').value;
	maxStorageId = parseInt(localStorage.getItem('max'));
	addToList((maxStorageId +1), newInput, false);
}

document.onkeydown = function() {
	if (window.event.keyCode == '13') {
		newInput = document.getElementById('input').value;
		maxStorageId = parseInt(localStorage.getItem('max'));
		addToList((maxStorageId +1), newInput, false);
	}
}

window.onload = function() {
	if (storageLength > 1) {
		for (var i = 1; i <= maxStorageId; i++) {
			var storageKey = i + '_li';
			var savedInputString = localStorage.getItem(storageKey);
			var savedInputList = JSON.parse(savedInputString);
			if (savedInputList) {
				addToList(i, savedInputList[0], savedInputList[1]);
			}
		}
	}
}
