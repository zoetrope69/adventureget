// item class
// ----------

function Item(name, description, weight){
	this._name = name;
	this._description = description;
	this._weight = weight;

	// accessors

	this.getName = function(){ return this._name; };

	this.getDescription = function(){ return this._description; };

	this.getWeight = function(){ return this._weight; };

	// mutators

	this.setName = function(value){ this._name = value; };

	this.setDescription = function(value){ this._description = value; };

	this.setWeight = function(value){ this._weight = value; };

}