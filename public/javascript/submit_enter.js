function submit_enter(field,e){
	var keycode;
	if(window.event){
		keycode = window.event.keyCode;
	}
	else if(e){
		keycode = e.which;
	}
	else{
		return true;
	}
	
	if(keycode == 13){
		myfield.form.submit();
		return false;
	}
	else{
		return true;
	}
}

function comment_enter(field,e){
	var keycode;
	if(window.event){
		keycode = window.event.keyCode;
	}
	else if(e){
		keycode = e.which;
	}
	else{
		return true;
	}
	
	if(keycode == 13){
		updComment();
		return false;
	}
	else{
		return true;
	}
}