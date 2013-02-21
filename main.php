<?php

	if (isset($_POST['commands']))
	{
		$command = $_POST['commands'];
		$commands = explode(" ", $command);
	}
	else
	{
		$commands = 'No input.';
	}
	echo "<p>Words in command:</p>";
	foreach($commands as &$c)
	{
		echo "<p>$c</p>";
	}
?>