var addButton =  document.getElementById('button');
var list = document.getElementById('todo-list');
var x = 0;

function addToList() {
	x++;
	var input = document.getElementById('input');
	var li = document.createElement('li');

	var checkBox = document.createElement("input");
	checkBox.type = 'checkbox';
	checkBox.checked = false;
	li.appendChild(checkBox);

	li.appendChild(document.createTextNode(input.value));
	list.appendChild(li);

	var deleteButton = document.createElement ("input");
	deleteButton.type = 'submit';
	deleteButton.value = "Delete";
	li.appendChild(deleteButton);

	checkBox.onclick = function() {
		if (checkBox.checked) {
			li.setAttribute("class", "lineThrough");
		}
		else {
			li.setAttribute("class", "normal");
		}
	}

	deleteButton.onclick = function() {
		li.parentNode.removeChild(li);
	}

	input.value = null;
}

addButton.onclick = addToList;

document.onkeydown = function() {
	if (window.event.keyCode == '13') {
		addToList();
	}
}
