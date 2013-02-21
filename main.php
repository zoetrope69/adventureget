<?php
	if (isset($_POST['commands']))
	{
		$command = $_POST['commands'];
		$commands = explode(" ", $command);
	}
	else
	{
		$command = 'got nothing from input';
	}
	echo "<p>your command contains these words:</p>";
	echo "<ul>";
	foreach($commands as &$c)
	{
		echo "<li>$c</li>";
	}
	echo "</ul>";
?>