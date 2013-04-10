// game class
// ----------

function Game(mapJSON){
	this._map = new Map();
	this._areas = this._map.loadMap(mapJSON);
	this._player = new Player("", 0, 0, 100, 0);
	this._parser = new Parser(this._areas, this._player);


	this.launch = function(){
		var playerLocX = this._player.character.getLoc('x');
		var playerLocY = this._player.character.getLoc('y');
		var data = this._areas[playerLocX][playerLocY].printDetails();
		return data;
	};
}