// area class
// ----------

function Area(title, description, locked, locX, locY, exits, items, npcs){
	this._title = title;
	this._description = description;
	this._locked = locked;
	this._explored = locked;
	this._locX = locX;
	this._locY = locY;
	if(exits !== null){ this._exits = exits; } else{ this._exits = []; }
	if(items !== null){ this._items = items; } else{ this._items = []; }
	if(npcs !== null){ this._npcs = npcs; } else{ this._npcs = []; }

	// accessors

	this.getTitle = function(){ return this._title;	};
	this.getDescription = function(){ return this._description; };
	this.getLocked = function(){ return this._locked; };
	this.getExplored = function(){ return this._explored; };

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
	this.setExplored = function(value){ this._explored = value; };

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
		output += "<p class='description'>You are now in: <span class='title'>" + this._title + "</span>.</p>";
		output += "<p> </p>";
		output += "<p class='description'>" + this._description + "</p>";
		output += "<p> </p>";

		// items
		if(this._items.length > 0){ // if there are items
			output += "<p class='description'>In this area you find the following items (<span class='mapicon'>i</span>): ";

			for(var i = 0; i < this._items.length; i++){
				output += "<span class='items'>" + this._items[i].getName() + "</span>";
				if(i == this._items.length - 2){ output += " and "; }
				else if(i == this._items.length - 1){ output += "."; }
				else{ output += ", "; }
			}

			output += "</p>";
		}

		// npcs
		if(this._npcs.length > 0){ // if there are npcs
			output += "<p class='description'>There are the following NPCs (<span class='mapicon'>☺</span>): ";

			for(var i = 0; i < this._npcs.length; i++){
				output += "<span class='npcs'>" + this._npcs[i].character.getName() + "</span>";
				if(i == this._npcs.length - 2){ output += " and "; }
				else if(i == this._npcs.length - 1){ output += "."; }
				else{ output += ", "; }
			}

			output += "</p>";
		}

		// exits
		if(this._exits.length > 0){ // if there are exits
			output += "<p class='description'>You can go: ";

			for(var i = 0; i < this._exits.length; i++){
				output += "<span class='exits'>" + this._exits[i] + "</span>";
				if(i == this._exits.length - 2){ output += " and "; }
				else if(i == this._exits.length - 1){ output += "."; }
				else{ output += ", "; }
			}

			output += "</p><p> </p>";
		}

		output += "<p class='description'>You can display the map with: <span class='dull'>\"map\"</span>.</p>";
		output += "<p class='description'>You can display a list of commands with: <span class='dull'>\"help\"</span>.</p>";
		output += "<p> </p>";

		return output;
	};

}