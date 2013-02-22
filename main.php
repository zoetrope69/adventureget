<?php
session_start();
include "classes/parser.php";
include "classes/player.php";
$parser = new Parser();
$_SESSION['player']= new Player('John Smith', 130, 50);

if (isset($_POST['commands'])){

	$command = trim($_POST['commands']);

	if($command == "")
	{
		echo "<p>You entered nothing!</p>";
	}
	else
	{
		$id = $parser->parseCommands($command);
		$parser->runCommand($id);
	}	
}
else
{

	echo "<p>adventureGet - super super awesome text <em>adventure</em> game</p>";
	$_SESSION['player']->printDetails();
}

?>