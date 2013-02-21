<?php
include 'classes/parser.php';
$parser = new Parser();

if (isset($_POST['commands'])){
	$command = $_POST['commands'];
	$commands = explode(" ", $command);

	if($_POST['commands'] == ""){
		echo "<p>You entered nothing!</p>";
	}else if($_POST['commands'] == "help"){
		echo "<p>available nouns:</p>";
		$parser->printNouns();
	}else{
		echo "<p>Words in command:</p>";
		foreach($commands as $c){
			echo "<p>$c</p>";
		}
	}
}
else{
	echo '<p>ERROR: Didn\'t get anything posted. :¬(</p>';
}
?>