<?php
include 'classes/player.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
	<script type="text/javascript" src="js/scripts.js"></script>
</head>
<body>				
	<main>		
		<section>
			<div id="text">
				<p>Welcome to the AdventureGet text based RPG written in PHP and Javascript by Zac Colley and Peter Jones</p>
				<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto facere optio recusandae explicabo necessitatibus obcaecati possimus voluptatibus illo id velit cumque praesentium repellendus. Eos consequatur illum adipisci quo. Exercitationem aliquam.</p>
			</div>
			<form method="post">
				<input type='Text' name='commands' onkeyup='refreshScreen(this)' autofocus>
			</form>
		</section>
	</main>
</body>
</html>