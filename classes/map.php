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

    	$xLimit = 8;
    	$yLimit = 5;

   		for($y = 0; $y < $yLimit + 1; $y++)
        {           
            $mapRow = array("", "│", "│", "");

            for($x = 0; $x < $xLimit + 1; $x++)
            {
                $playerLocX = $this->_player->getLoc('x');
                $playerLocY = $this->_player->getLoc('y');

                // first line on the row
                // --------------------

	       		if($y == 0) // if the first row
                {
                    if($x == 0) // if the first col
                    { 
                        $mapRow[0] .= "╭";                  
                    }

                        $mapRow[0] = $mapRow[0] . "─────";

                    if($x == $xLimit) // if the last col
                    { 
                        $mapRow[0] .= "╮</p>";
                    }
                    else // middle col
                    {
                        $mapRow[0] .= "┬";
                    }
                }

                // 2nd and 3rd lines on row
                // ------------------------

                if(!$this->_areas[$x][$y] == "") // this is an area
                { 
    		    	if($x == $playerLocX and $y == $playerLocY) // if player is in the area
                    { 
                        $mapRow[1] .= ".0. ".$x;
                        $mapRow[2] .= " ^  ".$y;
                    }
                    else // player isn't in area 
                    {   
                        $mapRow[1] .= "    ".$x;
                        $mapRow[2] .= "    ".$y;
                    }
                }
                else // if it isn't an area /grey/ it out
                { 
                    $mapRow[1] .= "░░░░░";
                    $mapRow[2] .= "░░░░░";
                }

                $mapRow[1] .= "│";
                if($x == $xLimit){
                    $mapRow[2] .= "│";
                }
                else
                {
                    $mapRow[2] .= "║";
                }


                // 4th line on row
                // ---------------

                if($y == $yLimit) // if bottom row
                {
                    if($x == 0) // if first col
                    {
                        $mapRow[3] .= "╰";
                    }

                        $mapRow[3] .= "─────"; 

                    if($x == $xLimit) // if last col
                    {
                        $mapRow[3] .= "╯";
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
                        $mapRow[3] .= "─────"; 
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
        	   echo "<p>" . $mapLine . "</p>";
            }
        }

        echo "</section>";
    }

} 
?> 