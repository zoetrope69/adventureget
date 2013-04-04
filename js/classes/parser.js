// parser class
// ------------
function Parser(areas, player){
	this._areas = areas;
	this._player = player;

	this.printCommands = function()
	{
		var output = "<p>Here is a list of commands:</p><p> </p>";

		$.ajax({ url: "js/commandlist.json", dataType: 'json', async: false,
		  success: function(json) {
		    for(var i = 0; i < json.command.length; i++){
				var variants = json.command[i].variants.split(" ").join(", "); // Split them up and put commas between
				output += "<p class='dull'>&gt; \'" + variants + "\'</p>";
				output += "<p class='items'>   " + json.command[i].description + "</p><p> </p>";
			}
		  }
		});

		return output;
	};

	this.parseCommands = function(input){
		var playerLocX = this._player.character.getLoc('x');
		var playerLocY = this._player.character.getLoc('y');
		var currentArea = areas[playerLocX][playerLocY];

		var verbs = new Array("use", "combine", "drop", "pickup", "get", "walk", "move", "go", "examine", "describe", "put", "open", "kick", "attack", "talk", "fuck", "break");
	    var miscNouns = new Array("all", "area", "north", "east", "south", "west", "n", "e", "s", "w");


	    // get an array for the names of items
	    var items =  currentArea.getItems();
	    items = items.concat(this._player.character.getItems()); // mix the player items and current area's items
	    for(var i = 0, itemNames = []; i < items.length; i++){
	    	itemNames.push(items[i].getName());
	    }

	    // get an array for the names of npcs
	    var npcs = currentArea.getNpcs();
	    for(var i = 0, npcNames = []; i < npcs.length; i++){
	    	npcNames.push(npcs[i].getName().toLowerCase());
	    }

	    var nouns = [];
	    nouns = miscNouns.concat(itemNames.concat(npcNames)); // add miscNouns and npcNames to the nouns array

	    var adjectives = new Array("rusty", "heavy", "bronze");
	    var prepositions = new Array("on", "under", "inside", "with");
	    var articles = new Array("the", "to");

	    var commands = [];
	    commands = input.toLowerCase().split(" "); // split up the input and make it lower case, put in an array

	    // intialising action items
	    var action = {};
	    action.subject = "you";
	    action.verb = action.preps = action.noun = action.article = action.object = null;

	    // ripping out the different parts from the input

	    var commandPos = 0;
		
		var command = null;
		var nounsCount = 0;
		for(var i = 0; i < commands.length; i++){
			command = commands[i];

			for(var j = 0; j < verbs.length; j++){
		  		if(verbs[j] == command){ action.verb = verbs[j]; }
			}

			for(var j = 0; j < nouns.length; j++){
				if(nouns[j] == command){
					if(nounsCount < 1){
						action.noun = nouns[j];

						for(var k = 0; k < adjectives.length; k++){
							if(commands[commandPos - 1] ==  adjectives[k]){
								action.noun =  adjectives[k] + " " + action.noun;
							}
						} // end of adjective loop
						
					}
					nounsCount++;
		  		}
			} // end of noun loop

			// articles
			for(var j = 0; j < verbs.length; j++){
				if(articles[j] == command){ action.article = articles[j]; }
			}

			// prepositions
			for(var j = 0; j < verbs.length; j++){
				if(prepositions[j] == command){
					action.preps = " " + prepositions[j];

					for(var k = 0; k < nouns.length; k++){
						if(commands[commandPos + 1] ==  nouns[k]){
							action.object = " " + nouns[k];
						}
					} // end of adjective loop
				}
			}

			commandPos++;

		} // end of command loop


		// removal of 'the' if names of npcs
		if(action.article == null){
			var anyNpcs = 0;
			for(var i = 0; i < npcs.length; i++){
				if(action.noun == npcs[i].getName().toLowerCase()){ anyNpcs++; }

				if(anyNpcs > 0){ action.article = "" }
				else{ action.article = "the"; }		
			}	
	    }

	    // special commands

	         if(commands.join('') == ""){ return "<p class='warn'>Enter something yo!</p>"; }
	    else if(commands[0] == "fullscreen" || commands[0] == "flscrn"){  toggleFullscreen(); }
	    else if(commands[0] == "clearscreen" || commands[0] == "clear" || commands[0] == "clr"){ clearScreen(); }
	    else if(commands[0] == "help" || commands[0] == "h"){ return this.printCommands(); }
	    else if(commands[0] == "inventory" || commands[0] == "i" || commands[0] == "inv"){ return this._player.inventory(); }
		else if(commands[0] == "map"){ return this._player.map(this._areas); }
		else if(commands[0] == "colourscheme"){ toggleColourScheme(); }
		else{


	    	var output;

		    if(action.verb == null || action.noun == null){
		        return "<p class='warn'>This is not a valid command</p>";
		    }else{
		    	if(action.preps == null){ action.preps = ""; }
		    	if(action.object == null){ action.object = ""; }
		    	if(action.article != ""){ action.article += " "; }
		        output = action.subject + " "  + action.verb + " " + action.article + action.noun + action.preps + action.object;
		        output = "<p class='dull'>" +  output.charAt(0).toUpperCase() + output.slice(1) + ".</p><p> </p>";
		    }

		    // player commands

		    switch(action.verb){

		    	case "kick":
			    	output += this._player.kick(action.noun);
		    		break;
		    	case "describe": case "examine":
			    	output += this._player.describe(action.noun, this._areas);
			    	break;
		    	case "walk": case "move": case "go":
					var directionCondition = (action.noun == "north" || action.noun == "east" ||
											  action.noun == "south" || action.noun == "west");
					// if this is a valid direction
					if(directionCondition){ output += this._player.walk(action.noun, this._areas); }
					else{ output += "<p class='warn'>That's not even a direction!</p>"; }
					break;
				case "pickup": case "get":
					output = this._player.moveItems(action.noun, this._areas, "pick up");
					break;
				case "drop":
					output = this._player.moveItems(action.noun, this._areas, "drop");
					break;
				case "use": case "combine":
					if(action.preps != ""){ // with another item/thing
						if(action.object != ""){
							output = this._player.combine(action.noun, action.object, this._areas);
						}else{
							output = "<p class='warn'>What with?</p>";
						}
					}else{
						// just use item
					}
					break;
				default:
	            	output += "<p class='warn'>This function does not exist</p>";
	        }

	        return output;

    	}

	};

};