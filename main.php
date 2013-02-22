<?php

include "classes/parser.php";
$parser = new Parser();

if (isset($_POST['commands']))
	{

	$command = trim($_POST['commands']);

	if($command == "")
	{
		echo "<p>You entered nothing!</p>";
	}
	else
	{
		$id = $parser->parseCommands($command);
		//echo "<p>the id returned is $id</p>";
		runCommand($id);
	}	
}
else
{
	echo '<p>ERROR: Didn\'t get anything posted. :¬(</p>';
}

function runCommand($id)
{
	if($id != null)
	{
		switch ($id) {
	    case 0:
	        echo "<p>you are walking</p>";
	        break;
	    case 1:
	        echo "<p>you are picking something up</p>";
	        break;
	    case 2:
	        echo "<p>you are climbing</p>";
	        break;
		}
	}
}

?>