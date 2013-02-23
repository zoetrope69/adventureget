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

	$title = 'area 0 0 - Large open field';
	$description = 'You are in area 0 0 - You are standing in a large open field';
	$items = array('knife', 'fork', 'spoon');
	$area00 = new Area($title, $description, 0, 0, $items); // Create a new area class

	$title = 'area 0 1';
	$description = 'You are in area 0 1';
	$area01 = new Area($title, $description, 0, 1, null); // Create a new area class

	$title = 'area 0 2';
	$description = 'You are in area 0 2';
	$area02 = new Area($title, $description, 0, 2, null); // Create a new area class

	$title = 'area 1 0';
	$description = 'You are in area 1 0';
	$area10 = new Area($title, $description, 0, 0, null); // Create a new area class

	$title = 'area 1 1';
	$description = 'You are in area 1 1';
	$area11 = new Area($title, $description, 0, 1, null); // Create a new area class

	$title = 'area 1 2';
	$description = 'You are in area 1 2';
	$area12 = new Area($title, $description, 0, 2, null); // Create a new area class

	$title = 'area 2 0';
	$description = 'You are in area 2 0';
	$area20 = new Area($title, $description, 0, 0, null); // Create a new area class

	$title = 'area2 1';
	$description = 'You are in area 2 1';
	$area21 = new Area($title, $description, 0, 1, null); // Create a new area class

	$title = 'area 2 2';
	$description = 'You are in area 2 2';
	$area22 = new Area($title, $description, 0, 2, null); // Create a new area class

	$areas = array( array($area00, $area01, $area02),
					array($area10, $area11, $area12),
					array($area20, $area21, $area22));

	$_SESSION['player'] = serialize($player);
	$_SESSION['areas'] = serialize($areas);
	echo "<p>adventureGet - super super awesome text adventure game</p>";
	echo "<p>Set your name with 'setname'";
	$areas[$player->getLoc('x')][$player->getLoc('y')]->printDetails();
}

?>