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

	// this is a change to my files
	// another change to my files

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

	this.map = function(areas){
		return "<p class='warn'>You've lost your map! (Or I haven't implemented it yet...)</p>"
	};

};