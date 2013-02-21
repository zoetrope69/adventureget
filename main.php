<?php
	echo "<p>Hello this is a text based RPG written in PHP and Javascript by Zac Colley and Peter Jones</p>";

	echo "<p>------------------------------------------------------------------------------------------</p>";

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

	echo "<p>------------------------------------------------------------------------------------------</p>";

	echo "<label>&gt;</label><input id=\"commands\" autofocus />";
?>