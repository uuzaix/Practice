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

	element.id = addId +'_li';
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


	var storageValue = JSON.stringify([elementValue, checkBoxState]);
	localStorage.setItem(element.id, storageValue);
	localStorage.setItem('max', addId);

	function updateStorage() {
		updateValue = JSON.parse(localStorage.getItem(element.id));
		localStorage.setItem(element.id, JSON.stringify([updateValue[0],checkBox.checked]));
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

	deleteButton.onclick = function() {
		element.parentNode.removeChild(element);
		localStorage.removeItem(element.id);
	}

	document.getElementById('input').value = ''
}


function addList() {
	newInput = document.getElementById('input').value;
	var newId = parseInt(localStorage.getItem('max'));
	createList(newId+1, newInput, false);
}

addButton.onclick = addList;

document.onkeydown = function() {
	if (window.event.keyCode == '13') {
		addList();
	}
}


window.onload = function() {
	if (storageLength > 1) {
		for (i=1; i <= maxId; i++) {
			currentId = i + '_li';
			currentValue = JSON.parse(localStorage.getItem(currentId));
			if (currentValue) {
				createList(i, currentValue[0], currentValue[1]);
			}
		}
	}
}