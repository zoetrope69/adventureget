<?php

include "classes/parser.php";
$parser = new Parser();

include 'classes/player.php';

session_start();

if (isset($_POST['commands'])){

	$command = trim($_POST['commands']);

	if($command == "")
	{
		echo "<p>You entered nothing!</p>";
	}
	else
	{
		$player = $_SESSION['player'];
		$id = $parser->parseCommands($command);
		$parser->runCommand($command, $id, $player);
	}	
}
else
{
	echo "<p>adventureGet - super super awesome text <em>adventure</em> game</p>";
	$player = new Player('', 130, 50);
	echo "<p>Set your name with 'setname'";
	$_SESSION['player'] = $player;
}

?>