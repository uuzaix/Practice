var button =  document.getElementById('button');
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

	var button = document.createElement ("input");
	button.type = 'submit';
	button.id = x + "_bt";
	button.value = "Delete";
	li.appendChild(button);

	console.log(li.id);
	console.log(checkBox.id);
	console.log(button.id);
	input.value = null;
}

button.onclick = addToList;

document.onkeydown = function(){
	if (window.event.keyCode == '13'){
		addToList();
	}
}

/*document.getElementById('li').onclick = function() {
	if (checkBox.checked) {
		??.setAttribute('class', 'lineThrough');
	}
	else {
		??.setAttribute('class', 'normal');
	}
}*/