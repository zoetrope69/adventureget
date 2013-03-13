<?php
	$title = "adventureGet - super awesome text adventure game";
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title><?php echo $title; ?></title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
	<header class="linger"><h1><?php echo $title; ?><a href="http://www.github.com/zaccolley/adventureget" target="_blank">come help!</a></h1></header>
	<article id="terminal">		
		<section id="text"></section>
		<label>&gt;</label><input id="commands" autofocus autocomplete="off" spellcheck="false"/>
	</article>
	<script type="text/javascript" src="js/jquery.js"></script>
	<script type="text/javascript" src="js/mapjson.js"></script>
	<script type="text/javascript" src="js/commandlistjson.js"></script>
	<script type="text/javascript" src="js/classes.js"></script>
	<script type="text/javascript" src="js/scripts.js"></script>
</body>
</html>