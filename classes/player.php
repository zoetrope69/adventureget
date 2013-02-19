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
    
    public function printPlayerDetails() { 
        //print 'Inside `aMemberFunc()`'; 
        echo "Player name " . $this->_name . " locX " . $this->_locX . " locY " . $this->_locY;
    } 
} 
?> 