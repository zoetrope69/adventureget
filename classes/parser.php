<?php
//The pareser class
 
class Parser{ 
    private $_verbs;

    function Parser()
    {
    }

    public function printNouns()
    {
        $_nouns = file('txt/nouns.txt');
        foreach($_nouns as $noun)
        {
            echo "<p>" . $noun . "</p>";
        }
    }
} 
?> 