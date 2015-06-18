var addButton =  document.getElementById('button');
var list = document.getElementById('todo-list');

function addToList() {

	var input = document.getElementById('input');
	var li = document.createElement('li');

	if (input.value == '') {
		return;
	}
	var checkBox = document.createElement("input");
	checkBox.type = 'checkbox';
	checkBox.checked = false;
	checkBox.style.margin = '5px';
	li.appendChild(checkBox);

	li.appendChild(document.createTextNode(input.value));
	list.appendChild(li);

	var deleteButton = document.createElement("input");
	deleteButton.type = 'submit';
	deleteButton.value = "Delete";
	deleteButton.style.margin = '5px 15px';
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
