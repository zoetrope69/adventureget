<?php
//The area class
 
class Area{
	private $_title;
	private $_description;
	private $_locX;
	private $_locY;
	private $_exits;
	private $_items;

	function Area($title, $description, $locX, $locY, $items){
		$this->_title = $title;
		$this->_description = $description;
		$this->_locX = $locX;
		$this->_locY = $locY;
		$this->_exits = array('north', 'south', 'east', 'west');
		if ($items != null){$this->_items = $items;}
		else{$this->_items = array();}
	}

	public function printDetails(){
		echo "<p>" . $this->_title . "</p>";
		echo "<p>" . $this->_description . "</p>";
		if($this->_items != null){
			echo "<p>Items in area:</p>";
			foreach($this->_items as $item){
				echo "<p>* " . $item . "</p>"; 
			}
		}
		echo "<p> </p>";
	}

	public function getDescription(){
		echo $this->_description;		
	}

	public function getItems(){
		return $this->_items;
	}

	public function removeItem($item){
		$this->_items = array_diff($this->_items, array($item));
		$this->_items = array_values($this->_items);
	}


	public function addItem($item){
		array_push($this->_items, $item);
	}

} 