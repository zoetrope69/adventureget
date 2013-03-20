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
		var verbs = new Array("drop", "pickup", "get","walk", "examine", "describe", "put", "open", "kick", "attack", "talk", "fuck", "break");
	    var nouns = new Array("all", "area", "sword", "key", "knife", "fork", "spoon", "chest", "door", "table", "dragon", "john", "betty", "spork", "north", "south", "east", "west");

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
	        action["article"] = "the";
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
		        output = "<p>" + action["subject"] + " "  + action["verb"] + " " + action["article"] + " " + action["noun"] + ".</p>";

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
				output = this._player.walk(direction, this._areas);					
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