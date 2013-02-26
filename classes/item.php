<?php

class Item{
	private $_name;
	private $_description;
	private $_weight;

	function Item($name, $description, $weight){
		$this->_name = $name;
		$this->_description = $description;
		$this->_weight = $weight;
	}

	public function getName(){
		return $this->_name;		
	}

	public function getDescription(){
		return $this->_description;		
	}
}

?>