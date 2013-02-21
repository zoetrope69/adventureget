<?php
include 'classes/parser.php';
$parser = new Parser();

if (isset($_POST['commands'])){
	$command = $_POST['commands'];
	$commands = explode(" ", $command);

	if($_POST['commands'] == ""){
		echo "<p>You entered nothing!</p>";
	}else if($_POST['commands'] == "help"){
		echo "<p>- $command</p>";
		echo "<p>Some helpful stuff printed here followed by a list of available commands</p>";
		echo "<p>available verbs:</p>";
		$parser->printVerbs();
	}else{
		echo "<p>- $command</p>";
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