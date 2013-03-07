<?php
//The area class
 
class Area{
	private $_title;
	private $_description;
	private $_locX;
	private $_locY;
	private $_exits;
	private $_items;
	private $_npcs;

	function Area($title, $description, $locX, $locY, $exits, $items, $npcs){
		$this->_title = $title;
		$this->_description = $description;
		$this->_locX = $locX;
		$this->_locY = $locY;
		$this->_exits = $exits;
		if ($items != null){$this->_items = $items;}
		else{$this->_items = array();}
		if ($npcs != null){$this->_npcs = $npcs;}
		else{$this->_npcs = array();}
	}

	public function printDetails(){
		echo "<p> </p>";
		echo "<p class='title'>" . $this->_title . "</p>";
		echo "<p> </p>";
		echo "<p class='description'>" . $this->_description . "</p>";
		echo "<p> </p>";

		if($this->_items != null){
			echo "<p class='items'>Items (<span class='mapicon'>i</span>) in area:</p>";
			foreach($this->_items as $item){
				echo "<p class='items'>  ❌ " . $item->getName() . "</p>"; 
			}
		}
		echo "<p> </p>";
		if($this->_npcs != null){
			echo "<p class='npcs'>NPCs (<span class='mapicon'>☺</span>) in area:</p>";
			foreach($this->_npcs as $npc){
				if($npc->getHostile()){ $hostile = "<span class='hostile'>☹</span>"; }else{ $hostile = "<span class='nothostile'>☺</span>"; }
				echo "<p class='npcs'>  " . $hostile . " " . $npc->getName() . "</p>"; 
			}
		}
		echo "<p> </p>";
		if($this->_exits != null){
			echo "<p class='exits'>Available Exits:</p>";
			foreach($this->_exits as $exit){
				echo "<p class='exits'>  ❖ " . $exit . "</p>"; 
			}
		}
		echo "<p> </p>";
		echo "<p class='map'>You can display the map with: \"map\".</p>";
	}

	public function getTitle(){
		return $this->_title;
	}

	public function getDescription(){
		return $this->_description;		
	}

	public function getItems(){
		return $this->_items;
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

	public function getExits(){
		return $this->_exits;
	}

	public function getNPCs(){
		return $this->_npcs;
	}

} 