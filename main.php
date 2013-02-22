<?php

//include "classes/parser.php";
//$parser = new Parser();

if (isset($_GET['commands']))
	{

	$command = trim($_GET['commands']);
	$commands = explode(" ", $command);

	if($command == "")
	{
		echo "<p>You entered nothing!</p>";
	}
	else
	{
		foreach($commands as $c)
		{
			if(strtolower($c) == "hello") // if text is "hello"
			{ 
				echo "<p>Hi there!</p>";
			}
			elseif(strtolower($c) == "help")
			{
				echo "<p>Some helpful stuff printed here followed by a list of available commands</p>";
				echo "<p>Available verbs:</p>";
				//$parser->printVerbs();
			}
			else
			{
				echo "<p>Ahh, I don't know what \"$c\" is... :¬(</p>";
			}
		}
	}	
}
else
{
	echo '<p>ERROR: Didn\'t get anything posted. :¬(</p>';
}

?>