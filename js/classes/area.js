// area class
// ----------

function Area(title, description, locked, locX, locY, exits, items, npcs){
	this._title = title;
	this._description = description;
	this._locked = locked; // make sure this is bool
	this._locX = locX;
	this._locY = locY;
	if(exits != null){ this._exits = exits; } else{ this._exits = new Array(); }
	if(items != null){ this._items = items; } else{ this._items = new Array(); }
	if(npcs != null){ this._npcs = npcs; } else{ this._npcs = new Array(); }
	
	// accessors

	this.getTitle = function(){ return this._title;	};

	this.getDescription = function(){ return this._description; };

	this.getLocked = function(){ return this._locked; };

	this.getLoc = function(coord){ //specify which coord, if none return both with a space between
        coord = coord.trim().toLowerCase();
        if(coord == "x"){ return this._locX; }
        else if(coord == "y"){ return this._locY; }
    };

    this.getExits = function(){ return this._exits; };
	
	this.getItems = function(){ return this._items; };

	this.getNpcs = function(){ return this._npcs; };

	// mutators

	this.setTitle = function(value){ this._title = value; };

	this.setDescription = function(value){ this._description = value; };
	
	this.setLocked = function(value){ this._locked = value; };

	this.setLoc = function(coord, value){
			 if(coord == 'x'){ this._locX = value; }
		else if(coord == 'y'){ this._locY = value; }
	};

	this.addExit = function(exit){
		this._exits.push(exit);
	};

	this.removeExit = function(exit){
		this._exits = jQuery.grep(this._exits, function(value) {
	  		return value != exit;
		});
	};

	this.addItem = function(item){
		this._items.push(item);
	};

	this.removeItem = function(item){
		this._items = jQuery.grep(this._items, function(value) {
	  		return value != item;
		});
	};

	this.addNpc = function(npc){
		this._npcs.push(npc);
	};

	this.removeNpc = function(npc){
		this._npcs = jQuery.grep(this._npcs, function(value) {
	  		return value != npc;
		});
	};

	// print them details

	this.printDetails = function(){
		var output = "";
		output = output + "<p class='title'>" + this._title + "</p>";
		output = output + "<p> </p>";
		output = output + "<p class='description'>" + this._description + "</p>";
		output = output + "<p> </p>";		

		if(this._items.length > 0){ // if there are items
			output = output + "<p class='items'>Items (<span class='mapicon'>i</span>) in area:</p>";
			for(var i = 0; i < this._items.length; i++){
				output = output + "<p class='items'>  ❖ " + this._items[i].getName() + "</p>"; 
			}

		output = output + "<p> </p>";		
		}


		if(this._npcs.length > 0){ // if there are npcs
			output = output + "<p class='npcs'>NPCs (<span class='mapicon'>☺</span>) in area:</p>";
			for(var i = 0; i < this._npcs.length; i++){
				output = output + "<p class='npcs'>  ❖ " + this._npcs[i].character.getName() + "</p>"; 
			}

		output = output + "<p> </p>";		
		}

		if(this._exits.length > 0){ // if there are exits
			output = output + "<p class='exits'>Available Exits:</p>";
			for(var i = 0; i < this._exits.length; i++){
				output = output + "<p class='exits'>  ❖ " + this._exits[i] + "</p>"; 
			}
		
		output = output + "<p> </p>";
		}

		output = output + "<p class='map'>You can display the map with: \"map\".</p>";
		output = output + "<p> </p>";

		return output;
	};
	
};	 