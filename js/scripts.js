(function(){

	function refreshScreen(){

		request = new ajaxRequest();
		request.open("GET", "main.php", true);

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
		request.send(null)
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
		
	refreshScreen();

})();

