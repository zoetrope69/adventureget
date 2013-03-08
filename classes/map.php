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

        $xLimit = max(array_keys($this->_areas)); // max value of x
        $yLimit = 0;

        for($x = 0; $x < $xLimit + 2; $x++){ // max value of y, comparing each branch of array to find biggest
            $yLength = max(array_keys($this->_areas[$x]));
            if($yLength > $yLimit){ $yLimit = $yLength; }          
        }

        for($y = 0; $y < $yLimit + 1; $y++)
        {           
            $mapRow = array("", "│", "│", "");

            for($x = 0; $x < $xLimit + 1; $x++)
            {
                $playerLocX = $this->_player->getLoc('x');
                $playerLocY = $this->_player->getLoc('y');
                $area = $this->_areas[$x][$y];

                // are the items/npcs in the tile
                $itemsPresent = 0;
                $NPCsPresent = 0;

                $itemsPresent = sizeof($area->getItems());
                $NPCsPresent = sizeof($area->getNPCs());             

                // first line on the row
                // --------------------

                if($y == 0) // if the first row
                {
                    if($x == 0) // if the first col
                    { 
                        $mapRow[0] .= "┌";                  
                    }

                    $mapRow[0] .= "─────";

                    if($x == $xLimit) // if the last col
                    { 
                        $mapRow[0] .= "┐</p>";
                    }
                    else // middle col
                    {
                        $mapRow[0] .= "┬";
                    }
                }

                // 2nd and 3rd lines on row
                // ------------------------

                if($itemsPresent){ $itemIcon = "<span class='mapicon'>i</span>"; }
                else{ $itemIcon = " "; }

                if($NPCsPresent){ $NPCIcon = "<span class='mapicon'>☺</span>"; }
                else{ $NPCIcon = " "; }

                if($area->getLocked()) // if it isn't an area /grey/ it out
                { 
                    $mapRow[1] .= "<span class='locked'>▒▒▒▒▒</span>";
                    $mapRow[2] .= "<span class='locked'>▒▒▒▒▒</span>";
                }
                else
                { 
                    if($x == $playerLocX and $y == $playerLocY) // if player is in the area
                    { 
                        $mapRow[1] .= "<span class='player'>.☺.</span> ".$itemIcon;
                        $mapRow[2] .= " <span class='player'>^</span>  ".$NPCIcon;
                    }
                    else // player isn't in area 
                    {   
                        $mapRow[2] .= "    ".$NPCIcon;
                        $mapRow[1] .= "    ".$itemIcon;
                    }
                }                

                $mapRow[1] .= "│";
                if($x == $xLimit){
                    $mapRow[2] .= "│";
                }
                else
                {
                    $wall = "<span class='locked'>║</span>";
                    foreach($area->getExits() as $exit)
                    {
                        if($exit == "east"){
                            $wall = "<span class='unlocked'>║</span>";                        
                        }
                    }                       
                    
                    $mapRow[2] .= $wall;
                }


                // 4th line on row
                // ---------------

                if($y == $yLimit) // if bottom row
                {
                    if($x == 0) // if first col
                    {
                        $mapRow[3] .= "└";
                    }

                        $mapRow[3] .= "─────"; 

                    if($x == $xLimit) // if last col
                    {
                        $mapRow[3] .= "┘";
                    }
                    else
                    {
                        $mapRow[3] .= "┴";
                    }
                }
                else // any other row
                {
                    if($x == 0) // if first col
                    {
                        $mapRow[3] .= "├";
                    } 

                    $wall = "──<span class='locked'>══</span>─";
                    foreach($area->getExits() as $exit)
                    {
                        if($exit == "south"){
                            $wall = "──<span class='unlocked'>══</span>─";                        
                        }
                    }                        
                    
                    $mapRow[3] .= $wall;

                    if($x == $xLimit) // if last col
                    {
                        $mapRow[3] .= "┤";
                    } 
                    else
                    {
                        $mapRow[3] .= "┼";
                    }
                }
    		}
            array_push($mapArray, $mapRow); // Stick the row onto the map array
        }


        foreach($mapArray as $mapRow){ // output
            foreach ($mapRow as $mapLine) {
        	   echo "<p>" . html_entity_decode($mapLine) . "</p>";
            }
        }

        echo "</section>";
    }

} 
?> 