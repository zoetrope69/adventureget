<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>				
	<main>		
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit nobis praesentium velit ex delectus pariatur facilis tenetur veritatis nulla consectetur quae optio laudantium sed perferendis neque reiciendis odio provident distinctio!</p>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit nobis praesentium velit ex delectus pariatur facilis tenetur veritatis nulla consectetur quae optio laudantium sed perferendis neque reiciendis odio provident distinctio!</p>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit nobis praesentium velit ex delectus pariatur facilis tenetur veritatis nulla consectetur quae optio laudantium sed perferendis neque reiciendis odio provident distinctio!</p>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit nobis praesentium velit ex delectus pariatur facilis tenetur veritatis nulla consectetur quae optio laudantium sed perferendis neque reiciendis odio provident distinctio!</p>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit nobis praesentium velit ex delectus pariatur facilis tenetur veritatis nulla consectetur quae optio laudantium sed perferendis neque reiciendis odio provident distinctio!</p>
		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit nobis praesentium velit ex delectus pariatur facilis tenetur veritatis nulla consectetur quae optio laudantium sed perferendis neque reiciendis odio provident distinctio!</p>

		<p>
		<?php

			$gameRunning = true;
			$count = 0;
			while($gameRunning){
				echo " " . $count;
				$count++;
				if($count == 200){
					break;
				}
			}

		?>
		</p>
	</main>
</body>
</html>