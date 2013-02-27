<?php

//The parser class

class Parser{ 

    private $_commandList;

    function Parser()
    {
        $this->_commandList = simplexml_load_file('txt/commandlist.xml');
    }
    public function printCommandList()
    {
        foreach($this->_commandList->command as $command)
        {
            $variants = (string)$command->variants;
            $description = (string)$command->description;
            echo "<p> </p>";
            echo "<p>\"" . $variants . "\"</p>";
            echo "<p>" . $description . "</p>";
        }
    }

    public function parseCommands($command, $player, $areas)
    {
        $command = strtolower($command);
        $commands = explode(" ", $command);
        echo "<p>- $command</p>";
        foreach($commands as $c)
        {
            foreach($this->_commandList->command as $commandListItem)
            {
                $commandVariants = explode(" ", $commandListItem->variants);
                foreach($commandVariants as $commandVariant){
                    if($c == $commandVariant){ //trim as there is a linebreak in text file
                        $commandID = $commandListItem->id;
                        $this->runCommand($command, $commandID, $player, $areas);
                        return;
                    }
                }
            }
        }
        // if we get this far it isnt a valid input so return error
        echo "<p class='warn'>\"$command\" is not a valid input. :¬(</p>";
    }

    public function runCommand($command, $id, $player, $areas)
    {
        if($id != null)
        {
            switch ($id) {
            case 0: // walk, move etc
                $commands = explode(" ", $command); // move input string into array of commands
                $area = $areas[$player->getLoc('x')][$player->getLoc('y')]; // get the area
                $openExits = $area->getExits(); // get open exits for this area
                if(sizeof($commands) > 1){ $command = $commands[1]; } // if more than one command, take the second as the direction
                $exits = array('north', 'south', 'east', 'west'); // array of the exits
                foreach($exits as $exit){
                    if($command == $exit || $command == $exit[0]){
                        $walking = false;
                        foreach($openExits as $openExit){
                            if($command == $openExit || $command == $openExit[0]){
                                $player->walk($openExit[0]);
                                $areas[$player->getLoc('x')][$player->getLoc('y')]->printDetails();
                                $walking = true;
                            }
                        }
                        if($walking == false){
                            echo "<p class='warn'>You cannot walk this way</p>";
                        }
                    }
                }
                break;
            case 1: // pickup, grab etc
                $commands = explode(" ", $command);
                $items = $areas[$player->getLoc('x')][$player->getLoc('y')]->getItems();
                $pickup = false;
                if($commands[1] == 'all'){
                    foreach($items as $item){
                        echo "<p>You pick up the " . $item . "</p>";
                        $player->addItem(trim($commands[1]));
                        $areas[$player->getLoc('x')][$player->getLoc('y')]->removeItem($item);
                        $pickup = true;
                    }
                }
                else{
                    foreach($items as $item){
                        if($commands[1] == $item->getName()){
                            echo "<p>You pick up the " . $item->getName() . "</p>";
                            $player->addItem($item);
                            $areas[$player->getLoc('x')][$player->getLoc('y')]->removeItem($item);
                            $pickup = true;
                        }
                    }
                }
                if($pickup == false){
                    echo "<p class='warn'>There is no " . $commands[1] . " to pick up</p>";
                }
                break;
            case 2: // climb, up, dowm etc
                echo "<p>You are climbing!</p>";
                break;
             case 3: // help
                echo "<p>Some helpful stuff printed here followed by a list of available commands</p>";
                echo "<p>Available commands:</p>";
                $this->printCommandList();
                break;
            case 4: // inventory
                if(sizeof($player->getItems()) > 0){
                    echo "<p>In your inventory you have:</p>";
                    foreach($player->getItems() as $item){
                        echo "<p>* " . $item->getName() . "</p>";
                    }
                }
                else
                {
                    echo "<p class='warn'>Your inventory is empty</p>";
                }
                break;
            case 5: // describearea
                echo "<p>" . $areas[$player->getLoc('x')][$player->getLoc('y')]->printDetails(). "</p>";
                break;
            case 6: // drop item in room
                $commands = explode(" ", $command);
                $items = $player->getItems();
                $drop = false;
                foreach($items as $item){
                    if($commands[1] == $item->getName()){
                        echo "<p>You drop the " . $item->getName() . "</p>";
                        $areas[$player->getLoc('x')][$player->getLoc('y')]->addItem(trim($commands[1]));
                        $player->removeItem($item);
                        $drop = true;
                    }
                }
                if($drop == false){
                    echo "<p class='warn'>You do not have a " . $commands[1] . " in your inventory</p>";
                }
                break;
            case 7: // talk
                $commands = explode(" ", $command);
                $area = $areas[$player->getLoc('x')][$player->getLoc('y')];
                $npcs = $area->getNPCs();
                if (sizeof($commands) > 1){
                    foreach($npcs as $npc){
                        $npcName = $npc->getName();
                        if($commands[1] == strtolower($npcName)) // if second command is the name of a NPC you can talk
                        { 
                            echo "<p class='npcs'>" . $npcName . " is a person you can talk to!</p>";
                        }
                    }
                }
                else
                {
                    echo "<p class='npcs'>Talk to who?</p>";
                }
                break;
            case 8: // examine, describe
                $commands = explode(" ", $command);
                $area = $areas[$player->getLoc('x')][$player->getLoc('y')];
                $items =  array_merge($player->getItems(), $area->getItems());
                $npcs = $area->getNPCs();
                $found = false; // is what ever user is looking is found                
                if($commands[1] == "area"){
                    $area->printDetails();
                    $found = true;
                }
                foreach($items as $item){
                    if($commands[1] == $item->getName()){
                        echo "<p class='items'>" . $item->getDescription() . "</p>";
                        $found = true;
                    }
                }
                foreach($npcs as $npc){
                    if($commands[1] == strtolower($npc->getName())){
                        echo "<p class='npcs'>" . $npc->getDescription() . "</p>";
                        $found = true;                        
                    }
                }
                if(!$found){ echo "<p class='warn'>No such thing!</p>"; }
                break;
            case 97: //setname
                $commands = explode(" ", $command);  // Commands to array              
                if(sizeof($commands) > 1){ // If there are more than one words (setname forename surname)
                    $name = trim(substr($command, 8)); // Tidy name
                    $player->setName(ucfirst($name)); 
                    echo "<p>Your name is now: ". $player->getName() . ".</p>";
                }
                else{
                    echo "<p class='warn'>Enter a valid name (setname [your name])</p>";
                }
                break;
            case 98: // getname
                $name =  $player->getName();
                if($name == ""){
                    echo "<p class='warn'>You don't have a name! :¬(</p>";
                }else{
                    echo "<p>Your name is: ". $player->getName() . ".</p>";
                }     
                break;
            case 99: // clear
                echo 'clearthatshit'; // this isn't the best way of doing it i think...
               break;
            case 100: // zacisadick
                echo "<p>Hi there! Here is a house for you:</p>";
                echo "<p>    __________________________</p><p>   /                          \</p><p>  /____________________________\</p>  <p>  ''|''''''''''''''''''''''''|''</p><p>    |  ___              ___  |</p>  <p>    | |_|_|            |_|_| |</p><p>    | |_|_|   _____    |_|_| |</p><p>    |         | 7 |          |</p><p> mmmmm        |  '|         mmmmm</p><p> |||||________|___|_________|||||</p><p>, , , , , , , ,\   \, , , , , , , ,</p><p> , , , , , , , |   | , , , , , , , </p><p>, , , , , , , /   /, , , , , , , </p>";
                break;
            }
        }
        $_SESSION['player'] = serialize($player); // puts player back into the session
        $_SESSION['areas'] = serialize($areas); // puts areas back into the session
    }
}

?> 