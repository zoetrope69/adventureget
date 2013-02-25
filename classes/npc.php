<?php
//The NPC class
 
class NPC { 
    private $_hostile; // Is the NPC hostil or not? / boolean
    private $_details; // Player details /

    function NPC($hostile, $details)
    {
        $this->_hostile = $hostile;
        $this->_details = $details;
    }
    
    // Get back hostility of NPC
    public function getHostile(){
        return $hostile;
    }

    // Set hostility of NPC
    public function setHostile($value){
        $hostile = $value;
    }

    // get details of NPC
    public function getDetails(){
        return $this->_details;
    }

} 

?> 