<?php
session_start();

foreach (glob("classes/*.php") as $file)
{
    include $file;
}
include "functions.php";
$parser = new Parser();


if (isset($_POST['commands'])){

	$command = trim($_POST['commands']);

	if($command == "")
	{
		echo "<p class='warn'>You entered nothing!</p>";
	}
	else
	{	$areas = unserialize($_SESSION['areas']);
		$player = unserialize($_SESSION['player']);

		$parser->parseCommands($command, $player, $areas);

	}	
}
else
{
	$areas = loadMap();
	$player = new Player('', 0, 0, 100, 0); // Create a new player class
	
	$_SESSION['player'] = serialize($player);
	$_SESSION['areas'] = serialize($areas);
	echo "<p>adventureGet - super awesome text adventure game</p>";
	echo "<p>Set your name with 'setname' [yourname]</p>";
    
	$areas[$player->getLoc('x')][$player->getLoc('y')]->printDetails();
}

?>