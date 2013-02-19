<?php
//The player class
 
class Player { 
    private $test;

    function Player()
    {
    	$this->test = 'a test variable';
    }
    
    public function aMemberFunc() { 
        //print 'Inside `aMemberFunc()`'; 
        echo $this->test;
    } 
} 

$foo = new Player;
$foo->aMemberFunc(); 
?> 