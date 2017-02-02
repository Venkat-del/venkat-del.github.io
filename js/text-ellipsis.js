
function ellipsizeTextBox(name) {
    var el = document.getElementsByClassName(name);
	for( var i=0; i<el.length; i++){
		var wordArray = el[i].innerHTML.split(' ');
		while(el[i].scrollHeight > el[i].offsetHeight) {
			wordArray.pop();
			el[i].innerHTML = wordArray.join(' ') + '...';
		}
	}
}
$(document).ready(function(){ellipsizeTextBox('description');});
