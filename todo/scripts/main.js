var addButton =  document.getElementById('button');
var list = document.getElementById('todo-list');
var x = 0;

function addToList() {
	x++;
	var input = document.getElementById('input');
	var li = document.createElement('li');
	li.id = x + '_li'

	var checkBox = document.createElement("input");
	checkBox.type = 'checkbox';
	checkBox.id = x + "_chb";
	checkBox.checked = false;
	li.appendChild(checkBox);

	li.appendChild(document.createTextNode(input.value));
	list.appendChild(li);

	var deleteButton = document.createElement ("input");
	deleteButton.type = 'submit';
	deleteButton.id = x + "_bt";
	deleteButton.value = "Delete";
	li.appendChild(deleteButton);

	console.log(li.id);
	console.log(checkBox.id);
	console.log(deleteButton.id);
	input.value = null;
}

addButton.onclick = addToList;

document.onkeydown = function(){
	if (window.event.keyCode == '13'){
		addToList();
	}
}

/*

function changeToDone () {
	if (checkBox.checked) {
		??.setAttribute('class', 'lineThrough');
	}
	else {
		??.setAttribute('class', 'normal');
	}
}*/

/*function deleteFromList() {
	var selection = document.getElementById("ID");
	slection.parentNode.removeChild();

deleteButton.onclick = deleteFromList;
*/
