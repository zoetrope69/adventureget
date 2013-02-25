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
		$exits = explode(" ", $area->exits);

		//dirty hack until I find a better fix
		if ($items[0] == ""){
			$items = null;
		}
		if ($exits[0] == ""){
			$exits = array('north', 'south', 'east', 'west');
		}

		$npcdetails = new Player("John", 0, 0);
		$npc1 = new NPC(false, $npcdetails);
		$npcs = array($npc1);

		$areas[$x][$y] = new Area($title, $description, $x, $y, $exits, $items, $npcs);

	}
	return $areas;
}
?>