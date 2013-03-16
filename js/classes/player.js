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
			console.log("x:"+playerLocX);
			console.log("y:"+playerLocY);
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

};