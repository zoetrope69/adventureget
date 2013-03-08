<?php
//The char class
 
class Char { 
    protected $_name;
    protected $_locX;
    protected $_locY;
    protected $_health;

    function Char($name, $startX, $startY, $health, $exp)
    {
        $this->_name = $name;
        $this->_locX = $startX;
        $this->_locY = $startY;
        $this->_items = array();
        $this->_health = $health;
        $this->_exp = $exp;
    }
    
    public function getName(){ 
        return $this->_name;
    }

    public function setName($name){
        $this->_name = $name;
    }

    public function getLoc($coord){ //specify which coord, if none return both with a space between
        $coord = strtolower(trim($coord));
        if($coord == "x"){    
            return $this->_locX;
        }
        elseif($coord == "y"){
            return $this->_locY;
        }
        else
        {
            return $this->_locX . " " . $this->_locY;
        }
    }

    public function setLoc($coord, $value){ // specific coord and value it should be
        $coord = strtolower(trim($coord));
        if($coord == "x"){    
            $this->_locX;
        }
        elseif ($coord == "y"){
            $this->_locY;
        }
    }

    public function getHealth(){
        return $this->_health;
    }

    public function setHealth($value){
        $this->_health = $value;
    }

} 
?> 