// player class (extends char)
// ---------------------------

function Player(name, locX, locY, health, exp){

	this.character = new Character(name, locX, locY, health, exp);

	this.walk = function(direction, areas){
		direction = direction.charAt(0);

             if(direction == "n"){ this.character._locY--; } // north
        else if(direction == "e"){ this.character._locX++; } // east
        else if(direction == "s"){ this.character._locY++; } // south
        else if(direction == "w"){ this.character._locX--; } // west

        playerLocX = this.character.getLoc('x');
		playerLocY = this.character.getLoc('y');
		data = areas[playerLocY][playerLocX].printDetails();
		return data;
	};

	this.kick = function(noun){
		return "<p>You kick the " + noun + " so hard you break your big toe!</p>";
	};

	this.describe = function(noun, areas){
		if(noun == "area"){
			 playerLocX = this.character.getLoc('x');
			playerLocY = this.character.getLoc('y');
			data = areas[playerLocY][playerLocX].printDetails();
			return data;
		}else{
			return "<p>The " + noun + " looks beautiful</p>";
		}
	};

};