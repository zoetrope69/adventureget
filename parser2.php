<?php

//The parser class

class Parser2{ 

    private $_commandList;

    function Parser(){
        $this->_commandList = simplexml_load_file('txt/commandlist.xml');
    }

    public function printCommandList(){
        foreach($this->_commandList->command as $command){
            $variants = (string)$command->variants;
            $description = (string)$command->description;
            echo "<p> </p>";
            echo "<p>\"" . $variants . "\"</p>";
            echo "<p>" . $description . "</p>";
        }
    }

    public function parseCommands($command, $player, $areas){

        $verbs = array("pick","walk", "examine", "describe", "put", "open", "kick", "attack", "talk");
        $nouns = array("hat", "sword", "key", "knife", "fork", "spoon", "chest", "door", "table", "dragon", "john", "betty");
        $adjectives = array("rusty", "heavy", "bronze");
        $preposition = array("on", "under", "inside");
        $articles = array("the", "to");

        $command = strtolower($command);
        $commands = explode(" ", $command);

        $action = array("subject" => "you",
                        "verb" => null,
                        "preps" => null,
                        "noun" => null,
                        "article" => null);
        $i = 0;
        foreach($commands as $word){
            foreach($verbs as $verb){
                if($verb == $word){
                    $action["verb"] = $verb;
                }
            }            
            foreach($nouns as $noun){
                if($noun == $word){
                    $action["noun"] = $noun;
                    foreach($adjectives as $adjective){
                        if($commands[$i-1] == $adjective){
                            $action["noun"] = $adjective ." " . $action["noun"];
                        }
                    }
                }
            }
            foreach($articles as $article){
                if($article == $word){
                    $action["article"] = $article;
                }
            }
            $i++;
        }

        if($action["article"] == null){
            $action["article"] = "the";
        }

        if($action["verb"] == null || $action["noun"] == null){
            echo "<p>This is not a valid command</p>";
        }
        else{
            echo "<p>" . $action["subject"] . " "  . $action["verb"] . " " . $action["article"] . " " . $action["noun"] . "</p>";
        }

    }
}

?>