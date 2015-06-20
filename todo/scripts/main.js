var addButton =  document.getElementById('button');
var list = document.getElementById('todo-list');
var count = 1;
//count++;
var storageLength = localStorage.length;
var newInput;

function addToList(newId, addInput, checkedStatus) {
	count++;

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
	}

	writeStorage();

	function readStorage() {
		currentStateString = localStorage.getItem(li.id);
		currentStateList = JSON.parse(currentStateString);
	}

	function updateStorage(){
		readStorage();
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
	console.log(newInput);
}


addButton.onclick = function() {
	newInput = document.getElementById('input').value;
	addToList(count, newInput, false);
}



document.onkeydown = function() {
	if (window.event.keyCode == '13') {
		newInput = document.getElementById('input').value;
		addToList(count, newInput, false);
	}
}


window.onload = function() {
	console.log(storageLength);
	if (!storageLength == 0){
		for (var i = 1; i <= storageLength; i++){
			var storageKey = i + '_li';
			var savedInputString = localStorage.getItem(storageKey);
			var savedInputList = JSON.parse(savedInputString);
			var savedInput = savedInputList[0];

			addToList(i, savedInput, savedInputList[1]);
		}
	}
}