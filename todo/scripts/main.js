var addButton =  document.getElementById('button');
var list = document.getElementById('todo-list');
var count = 0;

function addToList() {

	count++;
	var input = document.getElementById('input');
	var li = document.createElement('li');
	var checkBox = document.createElement("input");
	var deleteButton = document.createElement("input");

	if (input.value == '') {
		return;
	}

	li.id = count + '_li';

	checkBox.type = 'checkbox';
	checkBox.checked = false;
	checkBox.style.margin = '5px';
	
	deleteButton.type = 'submit';
	deleteButton.value = "Delete";
	deleteButton.style.margin = '5px 15px';

	li.appendChild(checkBox);
	li.appendChild(document.createTextNode(input.value));
	li.appendChild(deleteButton);


	list.appendChild(li);

	function writeStorage() {
		localStorage.setItem(li.id,JSON.stringify([input.value, checkBox.checked]));
	}

	writeStorage();

	function updateStorage(){
		readStorage();
		currentStateList = [currentStateList[0], checkBox.checked];
		localStorage.setItem(li.id,JSON.stringify(currentStateList));
	}

	function readStorage() {
		currentStateString = localStorage.getItem(li.id);
		currentStateList = JSON.parse(currentStateString);
	}

	checkBox.onclick = function() {
		if (checkBox.checked) {
			li.setAttribute("class", "lineThrough");
			updateStorage();
		}
		else {
			li.setAttribute("class", "normal");
			updateStorage();
		}
	}

	deleteButton.onclick = function() {
		li.parentNode.removeChild(li);
		localStorage.removeItem(li.id);
	}

	input.value = '';
}


addButton.onclick = addToList;


document.onkeydown = function() {
	if (window.event.keyCode == '13') {
		addToList();
	}
}
