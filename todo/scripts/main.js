var button =  document.getElementById('button')
var list = document.getElementById('todo-list')

function addToList() {
	var input = document.getElementById('input').value;
	var output = document.createElement('li');

	var checkBox = document.createElement("input");
	checkBox.type = 'checkbox';
	checkBox.id = 'c1';
	checkBox.value = name;
	checkBox.checked = false;

	
	output.appendChild(checkBox);
	output.appendChild(document.createTextNode(input));
	 
	list.appendChild(output);
	console.log(input);
	document.getElementById('input').value = null;
}

button.onclick = addToList;

document.onkeydown    = function(){
	if (window.event.keyCode == '13'){
		addToList();
	}
}