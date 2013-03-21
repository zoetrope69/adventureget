// parser class
// ------------
function Parser(areas, player){
	this._areas = areas;
	this._player = player;

	this.printCommands = function()
	{
		var output = new Array();
		output.push("<p>Here is a list of commands:</p><p> </p>");
		jQuery.getJSON("js/commandlist.json", function(json){
		for(var i = 0; i < json.command.length; i++){
			output.push("<p> </p>");
			output.push("<p>\"" + json.command[i].variants + "\"</p>");
			output.push("<p>" + json.command[i].description + "</p>");
		}
		}).complete(function(){
			$('#text').append(output.join("")); // Append on to the end of existing content
			$('#terminal').scrollTop( $('#terminal').prop("scrollHeight") ); // Scroll to bottom of terminal
		});
	};

	this.parseCommands = function(commands){
		var playerLocX = this._player.character.getLoc('x');
		var playerLocY = this._player.character.getLoc('y');
		var currentArea = areas[playerLocX][playerLocY];

		var verbs = new Array("drop", "pickup", "get", "walk", "move", "go", "examine", "describe", "put", "open", "kick", "attack", "talk", "fuck", "break");
	    var nouns = new Array("all", "area", "north", "east", "south", "west", "n", "e", "s", "w");

	    var items =  currentArea.getItems();
	    items = items.concat(this._player.character.getItems());
	    var itemNames = new Array();
	    for(var i = 0; i < items.length; i++){
	    	itemNames.push(items[i].getName());
	    	console.log(items[i].getName());
	    }

	    var npcs = currentArea.getNpcs();
	    var npcNames = new Array();
	    for(var i = 0; i < npcs.length; i++){
	    	npcNames.push(npcs[i].getName().toLowerCase());
	    }

	    nouns = nouns.concat(itemNames.concat(npcNames));
	    console.log(nouns);

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
			for(var j = 0; j < nouns.length; j++){
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
			var anyNpcs = 0;
			for(var i = 0; i < npcs.length; i++){
				if(action["noun"] == npcs[i].getName().toLowerCase()){ anyNpcs++; }

				if(anyNpcs > 0){ action["article"] = "" }
				else{ action["article"] = "the"; }		
			}	
	    }

	    // special commands

	         if(commands[0] == "fullscreen"){  toggleFullscreen(); }
	    else if(commands[0] == "clearscreen" || commands[0] == "clear" || commands[0] == "clr"){ clearScreen(); }
	    else if(commands[0] == "help" || commands[0] == "h"){ this.printCommands(); }
	    else if(commands[0] == "inventory" || commands[0] == "i" || commands[0] == "inv"){ return this._player.inventory(); }
		else if(commands[0] == "map"){ return this._player.map(this._areas); }
		else if(commands[0] == "colourscheme"){ toggleColourScheme(); }
		else{

	    	output = "";

		    if(action["verb"] == null || action["noun"] == null){
		        return "<p class='warn'>This is not a valid command</p>";
		    }else{
		    	if(action["article"] != ""){ action["article"] =   action["article"] + " "; }
		        output = action["subject"] + " "  + action["verb"] + " " + action["article"] + action["noun"];
		        output = "<p class='dull'>" +  output.charAt(0).toUpperCase() + output.slice(1) + ".</p>";
		    }

		    if(action["verb"] == "kick")
		    { 
			    output = output + "<p>" + this._player.kick(action['noun']) + "</p>";
			}
			else if(action["verb"] == "describe" || action["verb"] == "examine")
			{
			    output = output + this._player.describe(action['noun'], this._areas);
			}
			else if(action["verb"] == "walk" || action["verb"] == "move" || action["verb"] == "go")
			{
				direction = action["noun"];
				if(direction == "north" || direction == "east" || direction == "south" || direction == "west"){
					output = this._player.walk(direction, this._areas);				
				}else{
					output = "<p class='warn'>That's not even a direction!</p>";
				}
			}
			else if(action["verb"] == "pickup" || action["verb"] == "get")
			{
				item = action["noun"];
				output = this._player.moveItems(item, this._areas, "pick up");
			}
			else if(action["verb"] == "drop")
			{
				item = action["noun"];
				output = this._player.moveItems(item, this._areas, "drop");
			}
			else{
	            output = output + "<p class='warn'>This function does not exist</p>";
	        }

	        return output;

    	}

	};

};