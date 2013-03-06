<?php
session_start();

foreach (glob("classes/*.php") as $class) // Includes all the classes
{
    include $class;
}

//include "parser2.php";  // Experimental parser
//$parser = new Parser2();

$game = new Game();
$commands = $_POST['commands']; // Gets the input

if (isset($commands)) // If anything was posted
{
    $game->prepareCommands($commands); // Prepare for parsing
}
else
{
	$game->launch(); // On document load
}
?>