<?php
session_start();

foreach (glob("classes/*.php") as $file)
{
    include $file;
}
$parser = new Parser();


if (isset($_POST['commands'])){

	$command = trim($_POST['commands']);

	if($command == "")
	{
		echo "<p>You entered nothing!</p>";
	}
	else
	{	$areas = unserialize($_SESSION['areas']);
		$player = unserialize($_SESSION['player']);

		$parser->parseCommands($command, $player, $areas);

	}	
}
else
{
	$player = new Player('', 0, 0); // Create a new player class

	$title = 'room 0 0';
	$description = 'You are in room 0 0';
	$area00 = new Area($title, $description, 0, 0); // Create a new area class

	$title = 'room 0 1';
	$description = 'You are in room 0 1';
	$area01 = new Area($title, $description, 0, 1); // Create a new area class

	$title = 'room 0 2';
	$description = 'You are in room 0 2';
	$area02 = new Area($title, $description, 0, 2); // Create a new area class

	$areas = array($area00, $area01, $area02);
	$_SESSION['player'] = serialize($player);
	$_SESSION['areas'] = serialize($areas);
	echo "<p>adventureGet - super super awesome text adventure game</p>";
	echo "<p>Set your name with 'setname'";
}

?>