<?php

//The parser class

class Parser{ 
    
    private $_verbs;

    function Parser()
    {
        $this->_verbs = file('txt/verbs.txt');
        $this->_nouns = file('txt/nouns.txt');
    }

    public function printVerbs()
    {
        foreach($this->_verbs as $verb)
        {
            $commandParts = explode(":", $verb);
            $verb = $commandParts[0];
            echo "<p>* $verb</p>";
        }
    }

    public function parseCommands($command)
    {
        $commands = explode(" ", $command);
        echo "<p>- $command</p>";
        foreach($commands as $c)
        {
            foreach($this->_verbs as $verb)
            {
                $commandParts = explode(":", $verb);
                if($c == trim($commandParts[0])){ //trim as there is a linebreak in text file
                    $verbID = $commandParts[1];
                    return $verbID;
                }
            }
        }
        // if we get this far it isnt a valid input so return null
        echo "<p>\"$command\" is not a valid input. :¬(</p>";
        return null;
    }

    public function runCommand($command, $id, $player)
    {
        if($id != null)
        {
            switch ($id) {
            case 0: // walk, move etc
                echo "<p>You are walking!</p>";
                break;
            case 1: // pickup, grab etc
                echo "<p>You are picking something up!</p>";
                break;
            case 2: // climb, up, dowm etc
                echo "<p>You are climbing!</p>";
                break;
             case 3: // help
                echo "<p>Some helpful stuff printed here followed by a list of available commands</p>";
                echo "<p>Available verbs:</p>";
                $this->printVerbs();
                break;
            case 97: //setname
                $commands = explode(" ", $command);  // Commands to array              
                if(sizeof($commands) > 1){ // If there are more than one word (setname forename surname)
                    $name = trim(substr($command, 8)); // Tidy name
                    $player->setName($name); 
                    echo "<p>Your name is now: ". $player->getName() . ".</p>";
                }
                else{
                    echo "<p>Enter a valid name (one word)</p>";
                }
                break;
            case 98: //getname            
                echo "<p>Your name is: ". $player->getName() . ".</p>";
                break;
            case 99: // clearscreen
                echo 'clearthatshit'; // this isn't the best way of doing it i think...
               break;
            case 100: // hello
                echo "<p>Hi there!</p>";
                break;
            }
        }
    }
}

?> 