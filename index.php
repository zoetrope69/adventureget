<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>adventureGet - super awesome text adventure game</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<header><h1>adventureGet - super awesome text adventure game<a href="http://www.github.com/zaccolley/adventureget" target="_blank">come help!</a></h1></header>
	<article id="terminal">		
		<section id="text"></section>
		<label>&gt;</label><input id="commands" autofocus autocomplete="off" spellcheck="false"/>
	</article>
	<script type="text/javascript" src="js/jquery.js"></script> <!-- jQuery -->

	<script type="text/javascript" src="js/mapjson.js"></script> <!-- What should be JSON files -->
	<script type="text/javascript" src="js/commandlistjson.js"></script>

	<!-- This structure is for ease of coding -->
	<script type="text/javascript" src="js/classes/game.js"></script>
	<script type="text/javascript" src="js/classes/parser.js"></script>
	<script type="text/javascript" src="js/classes/area.js"></script>
	<script type="text/javascript" src="js/classes/item.js"></script>
	<script type="text/javascript" src="js/classes/map.js"></script>
	<script type="text/javascript" src="js/classes/character.js"></script>
	<script type="text/javascript" src="js/classes/player.js"></script>
	<script type="text/javascript" src="js/classes/npc.js"></script>

	<script type="text/javascript" src="js/main.js"></script>
</body>
</html>