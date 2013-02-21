var prevCommands = new Array(); //list of entered commands
var commandIndex = 0;

// AJAX SHIT

function refreshScreen(query){

	params = "commands=" + query.value;
	request = new ajaxRequest();
	request.open("POST", "main.php", true)
	request.setRequestHeader("Content-type",
		"application/x-www-form-urlencoded");
	request.setRequestHeader("Content-length", params.length);
	request.setRequestHeader("Connection", "close");

	request.onreadystatechange = function(){

		if (this.readyState == 4){
			if (this.status == 200){
				if (this.responseText != null){
					$('#text').append(this.responseText); // Append on to the end of existing content
		    		$('#commands').val("");	// Clear input box
		    	}else{
		    		alert("Ajax error: no data recieved");
		    	} 
		   	}
		   	else {
		   		alert("Ajax error: " + this.statusText);
		   	}
		}
	}
	request.send(params);
}

function ajaxRequest(){
	try{
		var request = new XMLHttpRequest()
 	}
 	catch(e1){
	  try{
	   request = new ActiveXObject("Msxml2.XMLHTTP")
	  }
	  catch(e2){
	  	try{
	    	request = new ActiveXObject("Microsoft.XMLHTTP")
	   	}
	   	catch(e3){
	    	request = false;
	   	}
	  }
 	}
	return request;
}

// When clicking the main terminal
$('main').click(function(){ 
	$('#commands').focus(); // Focus input #commands
});

// If someone presses enter when inputting
$('#commands').keydown(function(event) { // When keys are pressed in the input #commands
	code = event.keyCode || event.which; // Checks for key
	if(code == 13){ // If it's enter
		if(this.value !== ""){ //add the entered command to the commands array
			prevCommands[prevCommands.length] = this.value;
			commandIndex = prevCommands.length;
		}
		refreshScreen(this); // AJAX AWAY!
		event.preventDefault(); // Stops enter from doing what it normally does
	}
	if(code == 38){ // If it's the up key
		if(commandIndex > 0){
			commandIndex--;
			$('#commands').val(prevCommands[commandIndex]);
		}
		event.preventDefault(); // Stops enter from doing what it normally does
	}
	if(code == 40){ // If it's the up key
		if(commandIndex < prevCommands.length){
			commandIndex++;
			$('#commands').val(prevCommands[commandIndex]);
		}
		event.preventDefault(); // Stops enter from doing what it normally does
	}
});

