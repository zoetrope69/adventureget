<?php
//The player class
 
class Player extends Char{

    function Player($name, $startX, $startY, $health, $exp)
    {
        $this->_name = $name;
        $this->_locX = $startX;
        $this->_locY = $startY;
        $this->_items = array();
        $this->_health = $health;
        $this->_exp = $exp;
    }

} 
?> 