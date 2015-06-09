var text = document.querySelector('p');
var checkbox = document.getElementById('checkbox');

checkbox.onclick = function (){
	if (checkbox.checked){
		text.setAttribute("class", 'redText');
	}
	else{
		text.setAttribute("class", 'blackText');
	}
}



