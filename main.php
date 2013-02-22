<?php
session_start();

include "classes/parser.php";
include "classes/player.php";
$parser = new Parser();


if (isset($_POST['commands'])){

	$command = trim($_POST['commands']);

	if($command == "")
	{
		echo "<p>You entered nothing!</p>";
	}
	else
	{
		$player = unserialize($_SESSION['player']);
		$id = $parser->parseCommands($command);
		$parser->runCommand($command, $id, $player);
	}	
}
else
{
	$player = new Player('', 0, 0); // Create a new player class
	$_SESSION['player'] = serialize($player);
	echo "<p>adventureGet - super super awesome text <em>adventure</em> game</p>";
	echo "<p>Set your name with 'setname'";
}

?>