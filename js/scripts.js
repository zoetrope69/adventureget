function refreshScreen(query){

	params = "commands=" + query.value
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
		    		document.getElementById('text').innerHTML = this.responseText;
		    	}else{
		    		alert("Ajax error: no data recieved");
		    	} 
		   	}
		   	else {
		   		alert("Ajax error: " + this.statusText);
		   	}
		}
	}
	request.send(params)
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
	    	request = false
	   	}
	  }
 	}
	return request
}

