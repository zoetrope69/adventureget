<?php
//The player class
 
class Player extends Char{

	protected $_items;
    protected $_exp;

    function Player($name, $startX, $startY, $health, $exp)
    {
        $this->_name = $name;
        $this->_locX = $startX;
        $this->_locY = $startY;
        $this->_items = array();
        $this->_health = $health;
        $this->_exp = $exp;
    }

    public function walk($direction){
    	$direction = $direction[0];

        if($direction == "n"){ $this->_locY--; } // north
        elseif($direction == "e"){ $this->_locX++; } // east
        elseif($direction == "s"){ $this->_locY++; } // south
        elseif($direction == "w"){ $this->_locX--; } // west
        echo 'X: ' . $this->_locX . ' Y: ' . $this->_locY;
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

    public function setExp($value){
        $this->_exp = $value;
    }

    public function getExp(){
        return $this->_exp;
    }

    public function kick($item){
    	echo "You kick the " . $item . " so hard you break your big toe!";
    }

    public function describe($item, $area){
    	echo "The " . $item . " looks beautiful";

        $items =  array_merge($this->_items, $area->getItems());
        $found = false; // is what ever user is looking is found                
        foreach($items as $i){
            if($item == $i->getName()){
                echo "<p class='items'>" . $i->getDescription() . "</p>";
                $found = true;
            }
        }
    }

} 
?> 