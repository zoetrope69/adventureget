<?php
//The player class
 
class Player { 
    private $_name;
    private $_locX;
    private $_locY;
    private $_items;

    function Player($name, $startX, $startY)
    {
        $this->_name = $name;
        $this->_locX = $startX;
        $this->_locY = $startY;
        $this->_items = array();
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

    public function walkNorth(){
        $this->_locY++;
    }
    public function walkEast(){
        $this->_locX++;
    }
    public function walkSouth(){
        $this->_locY--;
    }
    public function walkWest(){
        $this->_locX--;
    }

    public function addItem($item){
        array_push($this->_items, $item);
    }
    public function removeItem($item){
        $this->_items = array_diff($this->_items, array($item));
        $this->_items = array_values($this->_items);
    }

    public function getItems(){
        return $this->_items;
    }

} 
?> 