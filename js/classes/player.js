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
		if(noun == "area"){
			playerLocX = this.character.getLoc('x');
			playerLocY = this.character.getLoc('y');
			data = areas[playerLocX][playerLocY].printDetails();
			return data;
		}else{
			return "<p>The " + noun + " looks beautiful</p>";
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

	this.moveItems = function(noun, areas, option){
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
		if(!movedItem){ output = output + "<p class='warn'>There is no " + noun + " to " + option + ".</p>"; }
        return output;
	};          

};