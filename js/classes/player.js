// player class (extends char)
// ---------------------------

function Player(name, locX, locY, health, exp){

	this.character = new Character(name, locX, locY, health, exp);

	this.walk = function(direction, areas){
		var direction = direction.charAt(0);
		var validDirection = 0;	
        var playerLocX = this.character.getLoc('x');
		var playerLocY = this.character.getLoc('y');
		var currentArea =  areas[playerLocX][playerLocY];
		for(var exit = 0; exit < currentArea.getExits().length; exit++){
			exits = currentArea.getExits();
			if(direction == exits[exit].charAt(0)){
				validDirection++;
			}
		}

		if(validDirection > 0){
			     if(direction == "n"){ this.character._locY--; } // north
	        else if(direction == "e"){ this.character._locX++; } // east
	        else if(direction == "s"){ this.character._locY++; } // south
	        else if(direction == "w"){ this.character._locX--; } // west

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
		playerLocX = this.character.getLoc('x');
		playerLocY = this.character.getLoc('y');
		currentArea = areas[playerLocX][playerLocY];
		var items = new Array();
		items = this.character.getItems().concat(currentArea.getItems());

		if(noun == "area"){
			return currentArea.printDetails();
		}
		else{
			var itemFound = false;
			for(var i = 0; i < items.length; i++){
				if(noun == items[i].getName()){
					return "<p>" + items[i].getDescription() + "</p>";
					itemFound = true;
				}
			}
			if(!itemFound){ return "<p>The " + noun + " is of little interest...</p>"; }
		}
	};

	this.inventory = function(){
		var items = this.character.getItems();
		if(items.length > 0){
			var output = "";
			output = output + "<p>In your inventory you have:</p>";
			for(var i = 0; i < items.length; i++){
				output = output + "<p>* " + items[i].getName() + "</p>";
			}
			return output;
		}else{
			return "<p class='warn'>Your inventory is empty</p>";
		}
	};

	this.moveItems = function(noun, areas, option){ /* I need to improve this and comment */
		var playerLocX = this.character.getLoc('x');
		var playerLocY = this.character.getLoc('y');
		var currentArea = areas[playerLocX][playerLocY];
		if(option == "pick up"){
			var items = currentArea.getItems();
		}else{
			var items = this.character.getItems();
		}
		var movedItem = false;
		var itemNameArray = new Array;
		output = "";
		for(var i = 0; i < items.length; i++){
			var itemsCondition = ( noun == items[i].getName() );
			if(noun == "all"){ itemsCondition = true; }
			if(itemsCondition){
				itemNameArray.push(items[i].getName());
				if(option == "pick up"){
					this.character.addItem(items[i]);
					currentArea.removeItem(items[i]);
				}else{
					this.character.removeItem(items[i]);
					currentArea.addItem(items[i]);
				}				
				movedItem = true;
			}
		}
		output = output + "<p>You " + option + " the " + itemNameArray.join(", ") + ".</p>";
		var commaPos = output.lastIndexOf(',');
		output = output.substring(0,commaPos) + " and" + output.substring(commaPos + 1)
		if(!movedItem){ output = "<p class='warn'>There is no " + noun + " to " + option + ".</p>"; }
        return output;
	};          

};