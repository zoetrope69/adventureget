<?php

//The parser class

class Parser{ 

    function Parser()
    {
    }

    public function printNouns()
    {
        $_nouns = file('txt/nouns.txt');
        foreach($_nouns as $noun)
        {
            echo "<p>* $noun</p>";
        }
    }
    public function printVerbs()
    {
        $_verbs = file('txt/verbs.txt');
        foreach($_verbs as $verb)
        {
            echo "<p>* $verb</p>";
        }
    }
}

?> 