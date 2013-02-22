<?php
	if (isset($_GET['commands'])){
		$command = trim($_GET['commands']);
		$commands = explode(" ", $command);

		if(trim($_GET['commands']) == ""){
			echo "<p>You entered nothing!</p>";
		}else{
			foreach($commands as $c){
				if(strtolower($c) == "hello"){ // if text is "hello"
					echo "<p>Hi there!</p>";
				}else{
					echo "<p>Ahh, I don't know what \"$c\" is... :¬(</p>";
				}
			}
		}	
	}
	else{
		echo '<p>ERROR: Didn\'t get anything posted. :¬(</p>';
	}
?>