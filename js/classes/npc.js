// npc class
// ---------

function Npc(name, locX, locY, health, exp, hostile, description){
	this.character = new Character(name, locX, locY, health, exp);
	this._hostile = hostile;
	this._description = description;

	// accessors

	this.getCharacter = function(){ return this.character; }
	this.getHostile = function(){ return this._hostile; };
	this.getDescription = function(){ return this._description; };

	// mutators

	this.setHostile = function(value){ this._hostile = value; };
	this.setDescription = function(value){ this._description = value; };

};