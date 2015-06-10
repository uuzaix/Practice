
var button =  document.getElementById('button')
var list = document.getElementById('todo-list')

function addToList() {
	var input = document.getElementById('input').value;
	var output = document.createElement('li');
	output.appendChild(document.createTextNode(input)); 
	list.appendChild(output);
	console.log(input);
}

button.onclick = addToList();

document.onekeydown	= function(){
	if (e.keyCode == '13'){
		addToList();
	}
}