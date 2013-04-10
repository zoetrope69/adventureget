// character class
// ---------------

function Character(name, locX, locY, health, exp){
	this._name = name;
	this._locX = locX;
	this._locY = locY;
	this._health = health;
	this._exp = exp;
    this._items = [];

	// accessors

	this.getName = function(){ return this._name; };

	this.getLoc = function(value){
			 if(value == "x"){ return this._locX; }
		else if(value == "y"){ return this._locY; }
	};

	this.getHealth = function(){ return this._health; };

	this.getExp = function(){ return this._exp; };

	this.getItems = function(){ return this._items; };

	// mutators

	this.setName = function(value){ this._name = value; };

	this.setLoc = function(coord, value){
			 if(coord == 'x'){ this._locX = value; }
		else if(coord == 'y'){ this._locY = value; }
	};

	this.setHealth = function(value){ this._health = value; };

	this.setExp = function(value){ this._exp = value; };

	this.addItem = function(item){
		this._items.push(item);
	};

	this.removeItem = function(item){
		this._items = jQuery.grep(this._items, function(value) {
			return value != item;
		});
	};

}