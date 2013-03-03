<?php
//The char class
 
class Char { 
    protected $_name;
    protected $_locX;
    protected $_locY;
    protected $_items;
    protected $_health;
    protected $_exp;

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

    public function setName($name){
        $this->_name = $name;
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

    public function walk($direction){
            if($direction == "n"){ $this->_locY--; } // north
        elseif($direction == "e"){ $this->_locX++; } // east
        elseif($direction == "s"){ $this->_locY++; } // south
        elseif($direction == "w"){ $this->_locX--; } // west
    }

    public function addItem($item){
        array_push($this->_items, $item);
    }
    public function removeItem($item){
        foreach($this->_items as $i => $value){
            if($value == $item){
                unset($this->_items[$i]);
            }
        }
        $this->_items = array_values($this->_items);
    }

    public function getItems(){
        return $this->_items;
    }

    public function setHealth($value){
        $this->_health = $value;
    }

    public function getHealth(){
        return $this->_health;
    }

    public function setExp($value){
        $this->_exp = $value;
    }

    public function getExp(){
        return $this->_exp;
    }

} 
?> 