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
	<header><h1><?php echo $title; ?><a href="http://www.github.com/zaccolley/adventureget" target="_blank">come help!</a></h1></header>
	<article id="terminal">		
		<section id="text"></section>
		<label>&gt;</label><input id="commands" autofocus autocomplete="off" spellcheck="false"/>
	</article>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script> <!-- jQuery -->
	<script type="text/javascript" src="js/scripts.js"></script>
</body>
</html>