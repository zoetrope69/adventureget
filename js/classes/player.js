// player class (extends char)
// ---------------------------

function Player(name, locX, locY, health, exp){

	this.character = new Character(name, locX, locY, health, exp);

	this.getCurrentArea = function(areas){
		var playerLocX = this.character.getLoc('x');
		var playerLocY = this.character.getLoc('y');
		return areas[playerLocX][playerLocY];
	};

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

	        var playerLocX = this.character.getLoc('x');
			var playerLocY = this.character.getLoc('y');
			return areas[playerLocX][playerLocY].printDetails();
		}else{
			return "<p class='warn'>You can't walk that way!</p>";
		}
	};

	this.kick = function(noun){
		return "<p>You kick the " + noun + " so hard you break your big toe!</p>";
	};

	this.describe = function(noun, areas){
		var currentArea = this.getCurrentArea(areas);		

		if(noun == "area"){
			return currentArea.printDetails();
		}
		else{
			var items = new Array();
			items = this.character.getItems().concat(currentArea.getItems());
			var descFound = false;
			for(var i = 0; i < items.length; i++){
				if(noun == items[i].getName()){
					return "<p class='items'>" + items[i].getDescription() + "</p>";
					descFound = true;
				}
			}
			if(!descFound){
				var npcs = currentArea.getNpcs();
				for(var i = 0; i < npcs.length; i++){
					if(noun == npcs[i].getName().toLowerCase()){
						return "<p class='npcs'>" + npcs[i].getDescription() + "</p>";
						descFound = true;
					}
				}
			}
			if(!descFound){ return "<p class='dull'>The " + noun + " is of little interest...</p>"; }
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

	this.moveItems = function(noun, areas, option){
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
			output += "<p>You " + option + " the " + itemNameArray.join(", ") + ".</p>";
			var commaPos = output.lastIndexOf(','); // Replace last comma with an 'and'
			output = output.substring(0,commaPos) + " and" + output.substring(commaPos + 1);
		}

        return output;
	};

	this.combine = function(noun, object, areas){
		var playerChar = this.character;
		var currentArea = this.getCurrentArea(areas);
		var items = playerChar.getItems().concat(currentArea.getItems());

		var output = "";

		jQuery.getJSON("js/combineditems.json", function(json){
		}).done(function(json){

			// loop through combined items
			for(var i = 0; i < json.combineditems.length; i++){

				var recipe = json.combineditems[i].recipe.items.split(" ");
				if(recipe[0] == noun && recipe [1] == object){

					// add new item
					var name = json.combineditems[i].name;
					var desc = json.combineditems[i].description;
					var weight = json.combineditems[i].weight;

					var item = new Item(name, desc, weight);
					playerChar.addItem(item);

					var discards = json.combineditems[i].recipe.discard;

					var nounItem = objectItem = null;

					// find item objects corresponding to names of noun and object
					var playerItems = playerChar.getItems();
					for(var j = 0; j < playerItems.length; j++){
						if(playerItems[j].getName() == noun){ nounItem = playerItems[j]; }
						if(playerItems[j].getName() == object){ objectItem = playerItems[j]; }
					}

					if(nounItem != null && objectItem != null){
						var areaItems = currentArea.getItems();
						for(var j = 0; j < areaItems.length; j++){
							if(areaItems[j].getName() == noun){ nounItem = areaItems[j]; }
							if(areaItems[j].getName() == object){ objectItem = areaItems[j]; }
						}
					}

					// remove items that are to be discarded in combining process
					for(var j = 0; j < discards.length; j++){
						if(discards[j] == noun){ playerChar.removeItem(nounItem); }
						if(discards[j] == object){ playerChar.removeItem(objectItem); }
					}

					output = "<p>You combined '" + noun + "' and '" + object + "' and made '" + name + "'</p>";
					console.log(output);			
				}
			} // end of combined items loop

			// if combined item not find
			output = "<p class='warn'>That does nothing...</p>";
		});

		return output;
		
	};

	this.map = function(areas){
		return "<p class='warn'>You've lost your map! (Or I haven't implemented it yet...)</p>"
	};

};