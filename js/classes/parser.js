// parser class
// ------------
function Parser(commandList, area, player){
	this._commandList = commandList;
	this._areas = areas;
	this._player = player;

	this.printCommands = function()
	{
		var output = ""
		json = jQuery.parseJSON(this._commandList);
		for(var i = 0; i < json.commands.length; i++){
			output = output + "<p> </p>";
			output = output + "<p>\"" + json.commands[i].variants + "\"</p>";
			output = output + "<p>" + json.commands[i].description + "</p>";
		}
		return output;
	};

	this.parseCommands = function(commands){
		var verbs = new Array("pick","walk", "examine", "describe", "put", "open", "kick", "attack", "talk", "fuck", "break");
	    var nouns = new Array("area", "sword", "key", "knife", "fork", "spoon", "chest", "door", "table", "dragon", "john", "betty", "spork", "north", "south", "east", "west");

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
	    else if(commands[0] == "clearscreen"){ clearScreen(); }
		else{

	    	output = "";

		    if(action["verb"] == null || action["noun"] == null){
		        return "<p>(This is not a valid command)</p>";
		    }else{
		        output = "<p>" + action["subject"] + " "  + action["verb"] + " " + action["article"] + " " + action["noun"] + "</p>";
		    }

		    if (action["verb"] == "kick") { 
			    output = output + "<p>" + this._player.kick(action['noun']) + "</p>";
			}else if(action["verb"] == "describe"){
			    output = output + this._player.describe(action['noun'], this._areas);
			}else if(action["verb"] == "walk"){
				direction = action["noun"];
				output = this._player.walk(direction, this._areas);					
			}else{
	            output = output + "<p>(This function does not exist)</p>";
	        }

	        return output;

    	}

	};

};