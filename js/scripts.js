var prevCommands = new Array(); //list of entered commands
var commandIndex = 0;

(function(){ // When document is done loading, load main.php
	// do some shit
})();

// When the window is resized
$(window).resize(function(){ 
	$('#terminal').scrollTop( $('#terminal').prop("scrollHeight") ); // Scroll to bottom of terminal
});

// When clicking the main terminal
$('#terminal').click(function(){ 
	$('#commands').focus(); // Focus input #commands
});

// If someone presses enter when inputting
$('#commands').keydown(function(event) { // When keys are pressed in the input #commands
	code = event.keyCode || event.which; // Checks for key
	
	if(code == 13){ // If it's enter
		$enterValue = this.value.trim();
		if($enterValue !== ""){ //add the entered command to the commands array
			prevCommands[prevCommands.length] = $enterValue;
			commandIndex = prevCommands.length;
		}
		updateTerminal(this); // Commands away!
		event.preventDefault(); // Stops enter from doing what it normally does
	}
	if(code == 38){ // If it's the up key
		if(commandIndex > 0){
			commandIndex--;
			$('#commands').val(prevCommands[commandIndex]);
		}
		event.preventDefault(); // Stops enter from doing what it normally does
	}
	if(code == 40){ // If it's the down key
		if(commandIndex < prevCommands.length){
			commandIndex++;
			$('#commands').val(prevCommands[commandIndex]);
		}
		event.preventDefault(); // Stops enter from doing what it normally does
	}
	
});

// THE GUBBINS

function updateTerminal(commandsInput){
	$commands = commandsInput.value;
	$data = areaaa.printDetails();
 	$('#text').append($data); // Append on to the end of existing content
	$data = parser.parseCommands($commands);
 	$('#text').append($data); // Append on to the end of existing content
	$('#commands').val("");	// Clear input box
	if($data.indexOf("clearthatshit") !== -1){ // If returned output has clearscreen in it
		$('#text').html(""); // Clear screen
	}
	if($data.indexOf("fullscreen") !== -1){ // If returned output has fullscreen in it
		$('#terminal').toggleClass("fullscreen"); // Add full screen class
	}
	$('#terminal').scrollTop( $('#terminal').prop("scrollHeight") ); // Scroll to bottom of terminal
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};


// game class
// ----------

function Game(){
	this._map = new Map();
	this._areas = this.map.loadMap();
	// import map
	var player = new Player("", 0, 0, 100, 0);
};

// map class
// ---------

function Map(){

	this.loadMap = function(){
	
	$xmlAreas = simplexml_load_file('txt/world.xml');
	$areas = array();
	$xAreaLimit = 0;
	$yAreaLimit = 0;

	foreach($xmlAreas->area as $area){
		$title = (string)$area->title;
		$description = (string)$area->description;
		$locked = (int)$area->locked;
		$x = intval($area->loc->x);
		$y = intval($area->loc->y);
		//$items = explode(" ", $area->items);
		$exits = explode(" ", $area->exits);
		$items = array();
		foreach($area->items->item as $item){
			$itemName = (string)$item->name;
			$itemDesc = (string)$item->description;
			$itemWeight = (string)$item->weight;
			array_push($items, new Item($itemName, $itemDesc, $itemWeight));
		}

		//dirty hack until I find a better fix
		if ($exits[0] == ""){
			$exits = array('north', 'south', 'east', 'west');
		}

		// npcs
		$npcs = array();
		foreach($area->npcs->npc as $npc){
			$npcName = (string)$npc->name;
			$npcDesc = (string)$npc->description;
			$npcHealth = (int)$npc->health;
			$npcExp = (int)$npc->exp;
			$npcHostile = (int)$npc->hostile;
			array_push($npcs, new NPC($npcName, $npcDesc, $x, $y, $npcHealth, $npcExp, $npcHostile));
		}

		$areas[$x][$y] = new Area($title, $description, $locked, $x, $y, $exits, $items, $npcs);

		if($x > $xAreaLimit){ $xAreaLimit = $x; }
		if($y > $yAreaLimit){ $yAreaLimit = $y; }

	}

	$exits = array();

	for($i = 0; $i < $xAreaLimit + 1; $i++){
		for($j = 0; $j < $yAreaLimit + 1; $j++){
			if(empty($areas[$i][$j])){
				$areas[$i][$j] = new Area("", "", 1, $i, $j, $exits, null, null);
			}
		}
	}

	return $areas;

	};

};

/* sakdnlsa */



/* snaldnsald */

// character class
// ---------------

function Character(name, locX, locY, health, exp){
	this._name = name;
	this._locX = locX;
	this._locY = locY;
	this._health = health;
	this._exp = exp;
    this._items = new Array();


	// accessors
	 
	this.getName = function(){ return this._name; };

	this.getLoc = function(value){
			 if(value == "x"){ return this._locX; }
		else if(value == "y"){ return this._locY; }
	};

	this.getHealth = function(){ return this._health; };

	this.getExp = function(){ return this._exp; };

	this.getItems = function(){ return this._items; };

	// mutators

	this.setName = function(value){ this._name = value; };

	this.setLoc = function(coord, value){
			 if(coord == 'x'){ this._locX = value; }
		else if(coord == 'y'){ this._locY = value; }
	};

	this.setHealth = function(value){ this._health = value; };

	this.setExp = function(value){ this._exp = value; };

	this.addItem = function(item){
		this._items.push(item);
	};

	this.removeItem = function(item){
		this._items = jQuery.grep(this._items, function(value) {
	  		return value != item;
		});
	};

};

// player class (extends char)
// ---------------------------

function Player(name, locX, locY, health, exp){

	this.character = new Character(name, locX, locY, health, exp);

	this.walk = function(direction){
		direction = direction[0];

             if(direction == "n"){ this.character._locY--; } // north
        else if(direction == "e"){ this.character._locX++; } // east
        else if(direction == "s"){ this.character._locY++; } // south
        else if(direction == "w"){ this.character._locX--; } // west
	};

	this.kick = function(noun){
		return "You kick the " + noun + " so hard you break your big toe!";
	};

	this.describe = function(noun, area){
		return "The " + noun + " looks beautiful";

		var items = this.character._items;
        items =  jQuery.merge(items, area.getItems());
        found = false; // is what ever user is looking is found                
        for(var i = 0; i < items.length; i++){
            if(noun == items[i].getName()){
                return "<p class='items'>" + items[i].getDescription() + "</p>";
                found = true;
            }
        }
	};

};

// npc class
// ---------

function Npc(name, locX, locY, health, exp, hostile, description){
	this.character = new Character(name, locX, locY, health, exp);
	this._hostile = hostile;
	this._description = description;

	// accessors

	this.getHostile = function(){ return this._hostile; };

	this.getDescription = function(){ return this._description; };

	// mutators

	this.setHostile = function(value){ this._hostile = value; };

	this.setDescription = function(value){ this._description = value; };

};

// area class
// ----------

function Area(title, description, locked, locX, locY, exits, items, npcs){
	this._title = title;
	this._description = description;
	this._locked = locked; // make sure this is bool
	this._locX = locX;
	this._locY = locY;
	if(exits != null){ this._exits = exits; } else{ this._exits = new Array(); }
	if(items != null){ this._items = items; } else{ this._items = new Array(); }
	if(npcs != null){ this._npcs = npcs; } else{ this._npcs = new Array(); }
	
	// accessors

	this.getTitle = function(){ return this._title;	}

	this.getDescription = function(){ return this._description; }

	this.getLocked = function(){ return this._locked; }

	this.getLoc = function(coord){ //specify which coord, if none return both with a space between
        coord = coord.trim().toLowerCase();
        if(coord == "x"){ return this._locX; }
        else if(coord == "y"){ return this._locY; }
    };

    this.getExits = function(){ return this._exits; };
	
	this.getItems = function(){ return this._items; }

	this.getNPCs = function(){ return this._npcs; };

	// mutators

	this.setTitle = function(value){ this._title = value; };

	this.setDescription = function(value){ this._description = value; };
	
	this.setLocked = function(value){ this._locked = value; };

	this.setLoc = function(coord, value){
			 if(coord == 'x'){ this._locX = value; }
		else if(coord == 'y'){ this._locY = value; }
	};

	this.addExit = function(exit){
		this._exits.push(exit);
	};

	this.removeExit = function(exit){
		this._exits = jQuery.grep(this._exits, function(value) {
	  		return value != exit;
		});
	};

	this.addItem = function(item){
		this._items.push(item);
	};

	this.removeItem = function(item){
		this._items = jQuery.grep(this._items, function(value) {
	  		return value != item;
		});
	};

	this.addNpc = function(npc){
		this._npcs.push(npc);
	};

	this.removeNpc = function(npc){
		this._npcs = jQuery.grep(this._npcs, function(value) {
	  		return value != npc;
		});
	};

	// print them details

	this.printDetails = function(){
		var output = "";
		output = output + "<p class='title'>" + this._title + "</p>";
		output = output + "<p> </p>";
		output = output + "<p class='description'>" + this._description + "</p>";
		output = output + "<p> </p>";		

		if(this._items.length > 0){ // if there are items
			output = output + "<p class='items'>Items (<span class='mapicon'>i</span>) in area:</p>";
			for(var i = 0; i < this._items.length; i++){
				output = output + "<p class='items'>  ❖ " + this._items[i].getName() + "</p>"; 
			}

		output = output + "<p> </p>";		
		}


		if(this._npcs.length > 0){ // if there are npcs
			output = output + "<p class='npcs'>NPCs (<span class='mapicon'>☺</span>) in area:</p>";
			for(var i = 0; this._npcs.length; i++){
				output = output + "<p class='npcs'>  ❖ " + this._npcs[i].getName() + "</p>"; 
			}

		output = output + "<p> </p>";		
		}

		if(this._exits.length > 0){ // if there are exits
			output = output + "<p class='exits'>Available Exits:</p>";
			for(var i = 0; i < this._exits.length; i++){
				output = output + "<p class='exits'>  ❖ " + this._exits[i] + "</p>"; 
			}
		
		output = output + "<p> </p>";
		}

		output = output + "<p class='map'>You can display the map with: \"map\".</p>";
		output = output + "<p> </p>";

		return output;
	};
	
};	 


// parser class
// ------------
function Parser(commandList){
	this.commandList = commandList;


	this.printCommands = function()
	{
		/* print the commands yo */
	};

	this.parseCommands = function(commands){
		var verbs = new Array("pick","walk", "examine", "describe", "put", "open", "kick", "attack", "talk", "fuck", "break");
	    var nouns = new Array("hat", "sword", "key", "knife", "fork", "spoon", "chest", "door", "table", "dragon", "john", "betty", "spork", "north", "south", "east", "west");

	    var adjectives = new Array("rusty", "heavy", "bronze");
	    var preposition = new Array("on", "under", "inside");
	    var articles = new Array("the", "to");

	    var command = commands.toLowerCase();
	    var commands = new Array();
	    commands = command.split(" ");

	    var action = {};
	    action["subject"] = "you";
	    action["verb"] = null;
	    action["preps"] = null;
	    action["noun"] = null;
	    action["article"] = null;

	    var commandPos = 0;

		command = null;
		for(var i = 0; i < commands.length; i++){
			command = commands[i];

			verb = null;
			for(var j = 0; j < verbs.length; j++){
		  		verb = verbs[j];
		  		if(verb == command){
					action["verb"] = verb;
		  		}
			} // end of verb loop

			noun = null;
			for(var j = 0; j < verbs.length; j++){
				noun = nouns[j];
				if(noun == command){
					action["noun"] = noun;

					adjective = null;
					for(var k = 0; k < adjectives.length; k++){
						adjective = adjectives[k];
						if(commands[commandPos - 1] == adjective){
							action["noun"] = adjective + " " + action["noun"];
						}
					} // end of adjective loop

		  		}
			} // end of noun loop

			article = null;
			for(var j = 0; j < verbs.length; j++){
				article = articles[j];
				if(article == command){
					action["article"] = article;
				}
			} // end of article loop

			commandPos++;

		} // end of command loop

		if(action["article"] == null){
	        action["article"] = "the";
	    }

	    if(action["verb"] == null || action["noun"] == null){
	        return "<p>This is not a valid command</p>";
	    }else{
	        return "<p>" + action["subject"] + " "  + action["verb"] + " " + action["article"] + " " + action["noun"] + "</p>";
	    }

	    verb = action["verb"];
		// if method exists from verb
		// do the method from player classs
		// else
		// this function doesn't exist
	    
	};

};

var commandsJSONObject = {'commands':[
    { 'variants': 'move walk go north east south west n e s w', 'description': 'allows you to move' },
    { 'variants': 'pickup get grab', 'description': 'allows you to pickup items' },
    { 'variants': 'climb', 'description': 'climbs things' },
    { 'variants': 'h help', 'description': 'displays help' },
    { 'variants': 'i inv inventory', 'description': 'displays inventory' },
    { 'variants': 'drop', 'description': 'drops items in current area' },
    { 'variants': 'talk chat speak', 'description': 'talk [npc] allows you to start a conversation with a NPC' },
    { 'variants': 'describe examine whatis', 'description': 'allows you to get more info on areas, items and npcs' },
    { 'variants': 'map', 'description': 'allows you to see the map' },
    { 'variants': 'setname', 'description': 'allows you to set your name' },
    { 'variants': 'getname myname', 'description': 'displays your name' },
    { 'variants': 'clr clear clearscreen clearterminal', 'description': 'clears the terminal window' },
    { 'variants': 'fullscreen flscrn fullscrn', 'description': 'makes terminal fullscreen' },
    { 'variants': 'zacisadick', 'description': 'magical command' }
    ]
};

var mapJSONObject = {
    "area": [
      {
        "title": "Large open field",
        "description": "You are standing in a large open field, the grass is long and brushes your ankles. You can just about see the tips of small yellow flowers sticking out where they have been swamped by the unkept grass. To the north you can see a large building.",
        "locked": "0",
        "loc": {
          "x": "0",
          "y": "0"
        },
        "exits": "east south",
        "items": {
          "item": [
            {
              "name": "knife",
              "description": "An ordinary knife, the type you might use to cut your food at the dinner table.",
              "weight": "1"
            },
            {
              "name": "fork",
              "description": "An ordinary fork, the type you might use to stab your food at the dinner table.",
              "weight": "1"
            },
            {
              "name": "spoon",
              "description": "An ordinary spoon, the type you might use to eat your pudding at the dinner table.",
              "weight": "1"
            },
            {
              "name": "spork",
              "description": "An ordinary spork, you could eat ANYTHING with this",
              "weight": "1"
            }
          ]
        },
        "npcs": {
          "npc": [
            {
              "name": "John",
              "description": "A burly man with faint aroma of coconut.",
              "health": "100",
              "exp": "9001",
              "hostile": "1"
            },
            {
              "name": "Jane",
              "description": "A dainty woman with a slight frame and bright smile.",
              "health": "98",
              "exp": "80085",
              "hostile": "0"
            }
          ]
        }
      },
      {
        "title": "Building entrance",
        "description": "You are standing at the enterance of a large university building. Above the door is a large sign that reads 'The University of Portsmouth'. It appears the door is open.",
        "locked": "0",
        "loc": {
          "x": "0",
          "y": "1"
        },
        "exits": "north south",
        "npcs": {
          "npc": {
            "name": "Bill",
            "description": "A moustachioed gentleman with a fancy for scrambled eggs.",
            "health": "50",
            "exp": "1337",
            "hostile": "0"
          }
        }
      },
      {
        "title": "Inside the University",
        "description": "Standing inside the university building you can see why this environment might be a good place for people to learn things.",
        "locked": "0",
        "loc": {
          "x": "0",
          "y": "2"
        },
        "exits": "north south"
      },
      {
        "title": "this is a lecture theatre",
        "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate quia recusandae aliquid vitae atque neque odit sequi rem eius qui vel amet praesentium quasi est perspiciatis ducimus eligendi corrupti dicta?",
        "locked": "0",
        "loc": {
          "x": "0",
          "y": "3"
        },
        "exits": "north"
      },
      {
        "title": "Zac's Palace",
        "description": "You find yourself inside Zac's palace, the greatest palace in Stourport.",
        "locked": "0",
        "loc": {
          "x": "1",
          "y": "0"
        },
        "exits": "west east",
        "npcs": {
          "npc": {
            "name": "Zac",
            "description": "Super cool guy.",
            "health": "78",
            "exp": "19",
            "hostile": "0"
          }
        }
      },
      {
        "title": "McDonald's",
        "description": "This place is of horrible nature. You can hardly contain your vomit.",
        "locked": "0",
        "loc": {
          "x": "2",
          "y": "0"
        },
        "exits": "west south",
        "items": "vomit happy-meal",
        "npcs": {
          "npc": {
            "name": "Worker",
            "description": "Smells a bit.",
            "health": "78",
            "exp": "19",
            "hostile": "1"
          }
        }
      },
      {
        "title": "Outside McDonald's",
        "description": "It's surprising that the back alley is nicer than the actual restaurant...",
        "locked": "0",
        "loc": {
          "x": "2",
          "y": "1"
        },
        "exits": "north",
        "items": "rubbish"
      }
    ]
}

var parser = new Parser(commandsJSONObject);
var areaaa = new Area("Big house!", "This is the description", 0, 1, 0, null, null, null);