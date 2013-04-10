// player class (extends char)
// ---------------------------

function Player(name, locX, locY, health, exp){
	this.character = new Character(name, locX, locY, health, exp);
	this._conscience = 0;
	this._faces = ['⚇','⚆','♾','⚈','⚉','☉','☯']; // faces for the map player icon
	this._playerFace = "<span class='player-head'>" + this._faces[0] + "</span>"; // set default face

	// accessors

	this.getCurrentArea = function(areas){
		var playerLocX = this.character.getLoc('x');
		var playerLocY = this.character.getLoc('y');
		return areas[playerLocX][playerLocY];
	};

	this.getPlayerFace = function(){
		return this._playerFace;
	};

	this.getConscience = function(descriptive){
		// if you give "descriptive" it pumps out a nice phrase
		if(descriptive == 'descriptive'){
				 if(this._conscience >= 10){return "<p class='conscience-good'>You are angelic.</p>"; }
			else if(this._conscience > 0){ return "<p class='conscience-good'>You are good.</p>"; }
			else if(this._conscience <= -10){ return "<p class='conscience-bad'>You are evil.</p>"; }
			else if(this._conscience < 0){ return "<p class='conscience-bad'>You are bad.</p>"; }
									 else{ return "<p class='conscience'>You are neutral.</p>"; }
		}
		else{ return this._conscience; } // otherwise just the value
	};

	// mutators

	this.setConscience = function(value){
		this._conscience += value;
	};

	this.setPlayerFace = function(value){
		// any other number than indexes results in a random face
		var face = this._faces[ Math.floor(Math.random() * this._faces.length) ];
		// if the number selected is an index in the faces then use that instead
		if(value >= 0 && value < this._faces.length){ face = this._faces[value]; }

		this._playerFace = "<span class='player-head'>" + face + "</span>";
	};

	// action functions

	this.walk = function(direction, areas){
		var validDirection = 0;
		var currentArea = this.getCurrentArea(areas);
		for(var exit = 0; exit < currentArea.getExits().length; exit++){
			exits = currentArea.getExits();
			if(direction == exits[exit]){
				validDirection++;
			}
		}

		if(validDirection > 0){
				 if(direction == "north"){ this.character._locY--; } // north
			else if(direction == "east"){ this.character._locX++; } // east
			else if(direction == "south"){ this.character._locY++; } // south
			else if(direction == "west"){ this.character._locX--; } // west


			// Get data for new area
			var playerLocX = this.character.getLoc('x');
			var playerLocY = this.character.getLoc('y');
			var newArea = areas[playerLocX][playerLocY];

			newArea.setExplored(true); // Set area to explored
			return newArea.printDetails(); // Return area's details
		}else{
			return "<p class='warn'>You can't walk that way!</p>";
		}
	};

	this.kick = function(noun){
		return "<p>You kick the " + noun + " so hard you break your big toe!</p>";
	};

	this.describe = function(noun, areas){
		var currentArea = this.getCurrentArea(areas);

		if(noun == "area"){ // if 'describe area'
			return currentArea.printDetails();
		}else{ // otherwise
			var items = [];
			items = this.character.getItems().concat(currentArea.getItems());
			// items
			for(var i = 0; i < items.length; i++){
				if(noun == items[i].getName()){ // if input equals the name of an item
					return "<p class='items'>" + items[i].getDescription() + "</p>";
				}
			}
			// npcs
			var npcs = currentArea.getNpcs();
			for(var i = 0; i < npcs.length; i++){
				if(noun == npcs[i].getName().toLowerCase()){ // if input equals the name of a npc
					return "<p class='npcs'>" + npcs[i].getDescription() + "</p>";
				}
			}
			// if no descriptions are found return this
			return "<p class='dull'>The " + noun + " is of little interest...</p>";
		}
	};

	this.inventory = function(){
		var items = this.character.getItems();
		if(items.length > 0){
			var output = "<p>In your inventory you have:</p>";
			for(var i = 0; i < items.length; i++){
				output += "<p>* " + items[i].getName() + "</p>";
			}
			return output;
		}else{
			return "<p class='warn'>Your inventory is empty</p>";
		}
	};

	this.moveItems = function(noun, areas, option){ //pickup and dropping
		var currentArea = this.getCurrentArea(areas);
		var items, itemNameArray = [];

		// select which items we're dealing with, either player's or area's
		if(option == "pick up"){ items = currentArea.getItems(); }
		else{ items = this.character.getItems(); }

		var movedItem = false;
		output = "";
		for(var i = 0; i < items.length; i++){
			var itemsCondition = (noun == items[i].getName());
			if(noun == "all"){ itemsCondition = true; }
			// if entered 'all' this condition is true regardless, otherwise it checks whether the noun entered is a item
			if(itemsCondition){
				itemNameArray.push(items[i].getName());
				// if picking up we're moving the items from the area and adding them to the player
				if(option == "pick up"){
					currentArea.removeItem(items[i]);
					this.character.addItem(items[i]);
				}else{
					this.character.removeItem(items[i]);
					currentArea.addItem(items[i]);
				}
				movedItem = true;
			}
		}

		// If no items were able to be moved then it isn't an item
		if(!movedItem){ output = "<p class='warn'>There is no " + noun + " to " + option + ".</p>"; }
		else{
			// Output what happened
			output += "<p>You " + option + " the '" + itemNameArray.join("', '") + "'.</p>";
			if(output.lastIndexOf(',') != -1){
				var commaPos = output.lastIndexOf(','); // Replace last comma with an 'and'
				output = output.substring(0,commaPos) + " and" + output.substring(commaPos + 1);
			}
		}

		return output;
	};

	this.combine = function(noun, object, areas){
		var playerChar = this.character;
		var currentArea = this.getCurrentArea(areas);

		var playerItems = playerChar.getItems();
		var areaItems = currentArea.getItems();

		var output = "";

		for(var i = 0; i < areaItems.length; i++){
			var areaItem = areaItems[i].getName();
			if(noun == areaItem || object == areaItem){
				return "<p class='warn'>You need to pick '" + areaItem + "' up!</p>";
			}
		}

		$.ajax({ url: "js/combineditems.json", dataType: 'json', async: false,
		  success: function(json) {
			var combinationFound = false;
			// loop through combined items
			for(var i = 0; i < json.combineditems.length; i++){

				var recipe = json.combineditems[i].recipe.items.split(" ");
				var recipeCondition = (recipe[0] == noun && recipe [1] == object)
								   || (recipe[1] == noun && recipe [0] == object);
				if(recipeCondition){

					// add new item
					var name = json.combineditems[i].name;
					var desc = json.combineditems[i].description;
					var weight = json.combineditems[i].weight;

					var item = new Item(name, desc, weight);
					playerChar.addItem(item);

					var discards = json.combineditems[i].discard.split(" ");
					// loops through inventory items and removes any that match the discards
					for(var j = 0; j < playerItems.length; j++){
						for(var k = 0; k < discards.length ; k++){
							if(playerItems[j].getName() == discards[k]){
								playerChar.removeItem(playerItems[j]);
							}
						}
					}

					combinationFound = true;
					output += "<p>You combined '" + noun + "' and '" + object + "'...</p>";
					output += "<p>.. and it made '" + name + "'!</p>";
				}

			} // end of combined items loop

			// if combined item not find
			if(!combinationFound){ output = "<p class='warn'>That does nothing...</p>"; }
		  }
		});

		return output;
	};

	this.map = function(areas){
		var currentArea = this.getCurrentArea(areas);
		var itemsPresent = false;
		var npcsPresent = false;
		var playerPresent = false;
		var locked = false;
		var explored = false;

		// how big the map should be

		var areaX = 0;
		var areaY = 0;

		for(var x = 0; x < areas.length; x++){
			for(var y = 0; y < areas[x].length; y++){
				// find the biggest location, if the found location is more the limit grows to that
				if(areas[x][y].getLoc('x') > areaX){ areaX = areas[x][y].getLoc('x'); }
				if(areas[x][y].getLoc('y') > areaY){ areaY = areas[x][y].getLoc('y'); }
			}
		}

		var lineLength = (areaX * 7) + areaX;

		// The special characters for the corner bits
		var topLineChars =		new Array("┌","┬","┐");
		var middleLineChars =	new Array("├","┼","┤");
		var bottomLineChars =	new Array("└","┴","┘");

		var linesArray = [];
		var lineChars;

		for(var y = 0; y <= areaY; y++){

			if(y === 0){ lineChars = topLineChars; }
				   else{ lineChars = middleLineChars; }

			var line1, line2, line3, line4;

			line1 = lineChars[0];
			line2 = line3 = line4 = "│";

			for(var x = 0; x <= areaX; x++){

				var area = areas[x][y];

				// are items, npcs and player present
				itemsPresent = area.getItems().length;
				npcsPresent = area.getNpcs().length;
				playerPresent =  (area == currentArea);

				// locked and explored areas
				locked = area.getLocked();
				explored = area.getExplored();

				// log of coords and what is present
				/*console.log("| " + x + ":" + y + " |");
				console.log("| items: " + itemsPresent + " | npcs: " + npcsPresent + " | player: " + playerPresent + " |");
				console.log("| locked: " + locked + " | explored: " + explored + " |");
				console.log(" ");*/

				// locked doors yo
				var lockedDoor = ["──", "│"];
				var exits = area.getExits();

				// east facing doors
				if(x != areaX){
					var exitXFound = false;
					for(var i = 0; i < exits.length; i++){
						if(exits[i] == 'east'){ lockedDoor[1] = "<span class='unlocked'>║</span>"; exitXFound = true; }
					}
					if(!exitXFound){ lockedDoor[1] = "<span class='locked'>║</span>"; }
				}

				// bottom south facing doors
				if(y !== 0){
					var exitYFound = false;
					for(var i = 0; i < exits.length; i++){
						if(exits[i] == 'north'){ lockedDoor[0] = "<span class='unlocked'>══</span>"; exitYFound = true; }
					}
					if(!exitYFound){ lockedDoor[0] = "<span class='locked'>══</span>"; }
				}

				// first line
				line1 += "───" + lockedDoor[0] + "─";
				if(x != areaX){ line1 += lineChars[1]; }else{ line1 += lineChars[2]; }

				// second line	
							   if(locked || !explored){ line2 += "<span class='fog'>XXXXXX</span>│";}
				else if(playerPresent && itemsPresent){ line2 += " <span class='player'>." + this._playerFace + ".</span> <span class='mapicon'>i</span>│"; } // both player and items
								else if(playerPresent){ line2 += " <span class='player'>." + this._playerFace + ".</span>  │"; } // just player
								 else if(itemsPresent){ line2 += "     <span class='mapicon'>i</span>│"; } // just items
												  else{ line2 += "      │"; } // none		

				// third line
							  if(locked || !explored){ line3 += "<span class='fog'>XXXXXX</span>" + lockedDoor[1];}
				else if(playerPresent && npcsPresent){ line3 += "  <span class='player'>^</span>  <span class='mapicon'>☺</span>" + lockedDoor[1]; } // both npcs and players					
							   else if(playerPresent){ line3 += "  <span class='player'>^</span>   " + lockedDoor[1]; } // just player
								 else if(npcsPresent){ line3 += "     <span class='mapicon'>☺</span>" + lockedDoor[1]; } // just npc
												 else{ line3 += "      " + lockedDoor[1]; } // none

			} // end of x loop

				// put in dat array, this is a 'row' of areas
				linesArray.push("<p>" + line1 + "</p>");
				linesArray.push("<p>" + line2 + "</p>");
				linesArray.push("<p>" + line3 + "</p>");

		} // end of y loop

		// last line of whole map
		var lastLine = bottomLineChars[0];
		for(var i = 0; i <= areaX; i++){
			lastLine += "─".repeat(6);
			if(i != areaX){ lastLine += bottomLineChars[1]; }
		}
		lastLine += bottomLineChars[2];
		linesArray.push("<p>" + lastLine + "</p>");

		// put all of it into a map class!
		return "<div class='map'>" + linesArray.join("") + "</div><p> </p>";
	};

}