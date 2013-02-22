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
		$parser->runCommand($id);
	}	
}
else
{
	echo '<p>ERROR: Didn\'t get anything posted. :¬(</p>';
}

?>