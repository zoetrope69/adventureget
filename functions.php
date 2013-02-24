<?php
function loadMap(){
	$xmlAreas = simplexml_load_file('txt/world.xml');
	$areas = array();

	foreach($xmlAreas as $area){
		$title = (string)$area->title;
		$description = (string)$area->description;
		$x = intval($area->loc->x);
		$y = intval($area->loc->y);
		$items = explode(" ", $area->items);

		//dirty hack until I find a better fix
		if ($items[0] == ""){
			$items = null;
		}

		$areas[$x][$y] = new Area($title, $description, 0, 0, $items);
	}
	return $areas;
}
?>