// game class
// ----------

function Game(commandListJSON, mapJSON){
	this._map = new Map(mapJSON);
	this._areas = this._map.loadMap();
	this._player = new Player("", 0, 0, 100, 0);
	this._parser = new Parser(commandListJSON, this._areas, this._player);

	this.launch = function(){
		playerLocX = this._player.character.getLoc('x');
		playerLocY = this._player.character.getLoc('y');
		data = this._areas[playerLocY][playerLocX].printDetails();
		return data;
	}
};