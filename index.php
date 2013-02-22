<?php
//brads test
include 'classes/player.php';
$player = new Player('Player', 0, 0);
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>adventureGET</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>				
	<article id="terminal">		
		<section id="text">
			<p>Hello this is a text based RPG written in PHP and Javascript...</p>
			<?php $player->printPlayerDetails(); ?>
		</section>
			<label>&gt;</label><input id="commands" autofocus autocomplete="off" spellcheck="false"/>
	</article>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script> <!-- jQuery -->
	<script type="text/javascript" src="js/scripts.js"></script>
</body>
</html>