<?php
//The player class
 
class Player { 
    private $_name;
    private $_locX;
    private $_locY;

    function Player($name, $startX, $startY)
    {
        $this->_name = $name;
        $this->_locX = $startX;
        $this->_locY = $startY;
    }
    
    public function getName(){ 
        return $this->_name;
    }

    public function getLoc($coord){ //specify which coord, if none return both with a space between
        if(strtolower(trim($coord)) == "x"){    
            return $this->_locX;
        }
        elseif(strtolower(trim($coord)) == "y"){
            return $this->_locY;
        }
        else
        {
            return $this->_locX . " " . $this->_locY;
        }
    }

    public function setName($name){
        $this->_name = $name;
    }

    public function setLoc($coord, $value){ // specific coord and value it should be
        if(strtolower(trim($coord)) == "x"){    
            $this->_locX;
        }
        elseif (strtolower(trim($coord)) == "y"){
            $this->_locY;
        }
    }

    public function printPlayerDetails(){ // print player details
        echo "<p>Player's name: '". $this->getName() . "'.</p>";
        echo "<p>Location: X " . $this->getLoc("x") . " | Y " . $this->getLoc("y") . "</p>";
    }

} 
?> 