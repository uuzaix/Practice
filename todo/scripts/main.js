var button =  document.getElementById('button');
var list = document.getElementById('todo-list');
var x = 0;

function addToList() {
	x++;
	var input = document.getElementById('input');
	var li = document.createElement('li');
	//li.id = 'x'

	var checkBox = document.createElement("input");
	checkBox.type = 'checkbox';
	checkBox.id = 'x';
	checkBox.checked = false;
	li.appendChild(checkBox);

	li.appendChild(document.createTextNode(input.value));
	list.appendChild(li);

	console.log(x);
	input.value = null;
}

button.onclick = addToList;

document.onkeydown = function(){
	if (window.event.keyCode == '13'){
		addToList();
	}
}

/*document.getElementById('x').onclick = function() {
	if (checkBox.checked) {
		??.setAttribute('class', 'lineThrough');
	}
	else {
		??.setAttribute('class', 'normal');
	}
}*/