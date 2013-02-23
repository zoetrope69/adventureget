<?php
//The area class
 
class Area{
	private $_title;
	private $_description;
	private $_loxX;
	private $_locY;
	private $_exits;
	private $_items;

	function Area($title, $description, $locX, $locY){
		$this->_title = $title;
		$this->_description = $description;
		$this->_locX = $locX;
		$this->_locY = $locY;
		$this->_exits = array('north', 'south', 'east', 'west');
		$this->_items = array();
	}

} 