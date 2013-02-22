<?php

//The parser class

class Parser{ 
    
    private $_verbs;
    private $_nouns;

    function Parser()
    {
        $this->_verbs = file('txt/verbs.txt');
        $this->_nouns = file('txt/nouns.txt');
    }

    public function printNouns()
    {
        foreach($this->_nouns as $noun)
        {
            echo "<p>* $noun</p>";
        }
    }
    public function printVerbs()
    {
        foreach($this->_verbs as $verb)
        {
            echo "<p>* $verb</p>";
        }
    }

    public function parseCommands($command)
    {
        $commands = explode(" ", $command);
        echo "<p>- $command</p>";
        foreach($commands as $c)
        {
            if(strtolower($c) == "hello") // if text is "hello"
            { 
                echo "<p>Hi there!</p>";
            }
            elseif(strtolower($c) == "clr") // if text is "clr"
            { 
                //clear screen somehow...
            }
            elseif(strtolower($c) == "help")
            {
                echo "<p>Some helpful stuff printed here followed by a list of available commands</p>";
                echo "<p>Available verbs:</p>";
                $this->printVerbs();
            }
            else
            {
                foreach($this->_verbs as $verb)
                {
                    $commandParts = explode(":", $verb);
                    if($c == trim($commandParts[0])){ //trim as there is a linebreak in text file
                        $verbID = $commandParts[1];
                        return $verbID;
                    }
                }
                echo "<p>\"$c\" is not a valid input. :¬(</p>"; // if we get this far it isnt a valid input
                return null;
            }
        }
    }
}

?> 