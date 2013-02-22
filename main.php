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
	echo "<p>adventureGet - super super awesome text <em>adventure</em> game</p>";
	$player = new Player('', 130, 50);
	echo "<p>Set your name with 'setname'";
	$_SESSION['player'] = serialize($player);
}

?>