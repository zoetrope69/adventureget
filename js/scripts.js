var prevCommands = new Array(); //list of entered commands
var commandIndex = 0;

(function(){ // When document is done loading, load main.php
	//$('#text').load("main.php");
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




// char class
// ----------

function Char(name, locX, locY, health, exp){
	this.chname = name;
	this.locX = locX;
	this.locY = locY;
	this.health = health;
	this.exp = exp;
    this.items = new Array();
};

// accessors
 
Char.prototype.getName = function(){ return this.chname; };

Char.prototype.getLoc = function(value){
		 if(value == "x"){ return this.locX; }
	else if(value == "y"){ return this.locY; }
};

Char.prototype.getHealth = function(){ return this.health; };

Char.prototype.getExp = function(){ return this.exp; }

Char.prototype.getItems = function(){ return this.items; }

// mutators

Char.prototype.setName = function(value){ this.chname = value; }

Char.prototype.setLoc = function(coord, value){
		 if(coord == 'x'){ this.locX = value; }
	else if(coord == 'y'){ this.locY = value; }
};

Char.prototype.setHealth = function(value){ this.health = value; }

Char.prototype.setExp = function(value){ this.exp = value; }

Char.prototype.addItem = function(item){
	this.items.push(item);
}

Char.prototype.removeItem = function(item){
	this.items = jQuery.grep(this.items, function(value) {
  		return value != item;
	});
}


// parser class
// ------------
function Parser(commandList){
	this.commandList = commandList;
};

Parser.prototype.printCommands = function()
{
	/* print the commands yo */
};

Parser.prototype.parseCommands = function(commands){
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

var parser = new Parser(commandsJSONObject);


