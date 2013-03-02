<?php
//The graphical map class
 
class GraphicalMap{
	private $_areas;
	private $_player;

    function GraphicalMap($areas, $player)
    {
       $this->_areas = $areas;
       $this->_player = $player;
    }

    public function makeTile()
    {
    	
    }

    public function printMap()
    {
    	echo "<section class='map'>";

    	$mapArray = array();

   		for($x = 0; $x < 1; $x++)
        {        	
   			for($y = 0; $y < 4; $y++)
   			{
				$areaLoc = $this->_areas[$x][$y]->getLoc('');
	       		$playerLoc = $this->_player->getLoc('');
	       		if($areaLoc == "0 0"){
					array_push($mapArray, "<p>╭───────╮</p>");	       			
	       		}
		    	if($areaLoc == $playerLoc){
		    		array_push($mapArray, "<p>│  _0_  │</p>");
	    			array_push($mapArray, "<p>│   ^   │</p>");
		    	}else{
	    			array_push($mapArray, "<p>│       │</p>");
	    			array_push($mapArray, "<p>│       │</p>");
		    	}
	    		 // array_push($mapArray, "<p>├─╼   ╾─┤</p>");
		    	if($areaLoc == "0 3"){
	    			array_push($mapArray, "<p>╰───────╯</p>");
		    	}else{
	    			array_push($mapArray, "<p>├───────┤</p>");
		    	}
    		}
        }


        foreach($mapArray as $mapPart){
        	echo $mapPart;
        }

        echo "</section>";
    }

} 
?> 