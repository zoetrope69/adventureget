<?php
//The NPC class
 
class NPC extends Char{ 
    private $_hostile; // Is the NPC hostile or not? / boolean
    private $_description; // Player description /

    function NPC($name, $desc, $startX, $startY, $health, $exp, $hostile)
    {
        $this->_name = $name;
        $this->_description = $desc;
        $this->_locX = $startX;
        $this->_locY = $startY;
        $this->_items = array();        
        $this->_health = $health;
        $this->_exp = $exp;
        $this->_hostile = (bool)$hostile;
    }
    
    // Get back hostility of NPC
    public function getHostile(){
        return $this->_hostile;
    }

    // Set hostility of NPC
    public function setHostile($value){
        $hostile = $value;
    }

    // get details of NPC
    public function getDescription(){
        return $this->_description;
    }

} 

?> 