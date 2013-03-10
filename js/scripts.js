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
	var game = new Game();
	$commands = commandsInput.value;
	$data = game._parser.printCommands(commandListJSON);
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
	/*this._map = new Map();
	this._areas = this._map.loadMap();*/
	this._parser = new Parser();
	var player = new Player("", 0, 0, 100, 0);

	// accessors

	this.getAreas = function(){ return this._areas; };

};

// map class
// ---------

function Map(){

	this.loadMap = function(){
		
		areas = new Array();
		xMapLimit = 0;
		yMapLimit = 0;

		m = jQuery.parseJSON(mapJSON);
      			
		for(var i = 0; i < this._map.area.length; i++){
			area = this._map.area[i];
			title = area.title;
			description = area.description;
			locked = area.locked;
			x = area.loc.x;
			y = area.loc.y;
			exits = area.exits.split(" ");

			// pete: dirty hack until I find a better fix
			if(exits[0] == ""){ exits = new Array('north', 'south', 'east', 'west'); }

			items = new Array();
			for(var j = 0; j < area.items.item.length; j++){
				item = area.items.item[j];
				itemObj = new Item(item.name, item.description, item.weight);
				items.push(itemObj);
			}			
			
			npcs = new Array();
			for(var j = 0; area.npcs.npc.length; j++){
				npc = area.npcs.npc[j];
				npcObj = new Npc(npc.name, npc.loc.x, npc.loc.y, npc.health, npc.exp, npc.hostile, npc.description);
				npcs.push(npcObj);
			}

			areas[x][y] = new Area(title, description, locked, x, y, exits, items, npcs);

			if(x > xMapLimit){ xMapLimit = x; }
			if(y > yMapLimit){ yMapLimit = y; }

  		}

		emptyExits = new Array(); // this code is messy :(

		for(i = 0; i < xMapLimit + 1; i++){
			for(j = 0; j < yMapLimit + 1; j++){
				if(typeof areas[i][j] == 'undefined'){
					areas[i][j] = new Area("", "", 1, i, j, emptyExits, null, null);
				}
			}
		}

		return areas;
	};

};

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

// item class
// ----------

function Item(name, description, weight){
	this._name = name;
	this._description = description;
	this._weight = weight;

	// accessors

	this.getName = function(){ return this._name; };
	
	this.getDescription = function(){ return this._description; };
	
	this.getWeight = function(){ return this._weight; };

	// mutators

	this.setName = function(value){ this._name = value; };
	
	this.setDescription = function(value){ this._description = value; };
	
	this.setWeight = function(value){ this._weight = value; };

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
		var output = ""
		json = jQuery.parseJSON(commandListJSON);
		for(var i = 0; i < 10; i++){
			output = output + "<p> </p>";
			output = output + "<p>\"" + json.commands[i].variants + "\"</p>";
			output = output + "<p>" + json.commands[i].description + "</p>";
		}
		return output;
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

var commandListJSON = '{"commands": [{'
				    + ' "variants": "move walk go north east south west n e s w",'
				    + ' "description": "allows you to move"'
    			+ '}, {'
			        + '"variants": "pickup get grab",'
			        + '"description": "allows you to pickup items"'
			    + '}, {'
			        + '"variants": "climb",'
			        + '"description": "climbs things"'
			    + '}, {'
			        + '"variants": "h help",'
			        + '"description": "displays help"'
			    + '}, {'
			        + '"variants": "i inv inventory",'
			        + '"description": "displays inventory"'
			    + '}, {'
			        + '"variants": "drop",'
			        + '"description": "drops items in current area"'
			    + '}, {'
			        + '"variants": "talk chat speak",'
			        + '"description": "talk npc allows you to start a conversation with a NPC"'
			    + '}, {'
			        + '"variants": "describe examine whatis",'
			        + '"description": "allows you to get more info on areas, items and npcs"'
			    + '}, {'
			        + '"variants": "map",'
			        + '"description": "allows you to see the map"'
			    + '}, {'
			        + '"variants": "setname",'
			        + '"description": "allows you to set your name"'
			    + '}, {'
			        + '"variants": "getname myname",'
			        + '"description": "displays your name"'
			    + '}, {'
			        + '"variants": "clr clear clearscreen clearterminal",'
			        + '"description": "clears the terminal window"'
			    + '}, {'
			        + '"variants": "fullscreen flscrn fullscrn",'
			        + '"description": "makes terminal fullscreen"'
			    + '}, {'
			        + '"variants": "zacisadick",'
			        + '"description": "magical command"'
    			+ '}]}';



