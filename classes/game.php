<?php

//The game class
 
class Game{
	private $_parser;
	private $_areas;
	private $_player;

    function Game(){
    	$this->_parser = new Parser(); // Create a new parser
    	$this->_areas = $this->loadMap(); // Load map
		$this->_player = new Player('', 0, 0, 100, 0); // Create a new player class
		
		$_SESSION['player'] = serialize($this->_player); // Sessions ensure data can carry between "refreshes"
		$_SESSION['areas'] = serialize($this->_areas);
    }

    function loadMap(){
		$xmlAreas = simplexml_load_file('xml/map.xml');
		$areas = array();

		foreach($xmlAreas->area as $area){
			$title = (string)$area->title;
			$description = (string)$area->description;
			$x = intval($area->loc->x);
			$y = intval($area->loc->y);
			//$items = explode(" ", $area->items);
			$exits = explode(" ", $area->exits);
			$items = array();
			foreach($area->items->item as $item){
				$itemName = (string)$item->name;
				$itemDesc = (string)$item->description;
				$itemWeight = (string)$item->weight;
				array_push($items, new Item($itemName, $itemDesc, $itemWeight));
			}

			//dirty hack until I find a better fix
			if ($exits[0] == ""){
				$exits = array('north', 'south', 'east', 'west');
			}

			// npcs
			$npcs = array();
			foreach($area->npcs->npc as $npc){
				$npcName = (string)$npc->name;
				$npcDesc = (string)$npc->description;
				$npcHealth = (int)$npc->health;
				$npcExp = (int)$npc->exp;
				$npcHostile = (int)$npc->hostile;
				array_push($npcs, new NPC($npcName, $npcDesc, $x, $y, $npcHealth, $npcExp, $npcHostile));
			}

			$areas[$x][$y] = new Area($title, $description, $x, $y, $exits, $items, $npcs);

		}
		return $areas;
	}

    public function chew($command){
    	$command = trim($command); // Take the spaces off the ends
    	if($command == "")
		{
			echo "<p class='warn'>You entered nothing!</p>";
		}
		else
		{	
			$areas = unserialize($_SESSION['areas']);
			$player = unserialize($_SESSION['player']);

			$this->_parser->parseCommands($command, $player, $areas);
		}	
    }

    public function launch(){
		echo "<p>adventureGet - super awesome text adventure game</p>";
		echo "<p>Set your name with 'setname' [yourname]</p>";
	    
	    $playerX = $this->_player->getLoc('x');
	    $playerY = $this->_player->getLoc('y');
		$this->_areas[$playerX][$playerY]->printDetails();
    }

} 

?> 