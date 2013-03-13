var prevCommands = new Array(); //list of entered commands
var commandIndex = 0;

// When the window is resized
$(window).resize(function(){ 
	$('#terminal').scrollTop( $('#terminal').prop("scrollHeight") ); // Scroll to bottom of terminal
});

// When clicking the main terminal
$('#terminal').click(function(){ 
	$('#commands').focus(); // Focus input #commands
});

// If someone presses enter when inputting
$('#commands').keydown(function(event) { // When keys are pressed in the input #commands
	code = event.keyCode || event.which; // Checks for key
	
	if(code == 13){ // If it's enter
		$enterValue = this.value.trim();
		if($enterValue !== ""){ //add the entered command to the commands array
			prevCommands[prevCommands.length] = $enterValue;
			commandIndex = prevCommands.length;
		}
		updateTerminal(this); // Commands away!
		event.preventDefault(); // Stops enter from doing what it normally does
	}
	if(code == 38){ // If it's the up key
		if(commandIndex > 0){
			commandIndex--;
			$('#commands').val(prevCommands[commandIndex]);
		}
		event.preventDefault(); // Stops enter from doing what it normally does
	}
	if(code == 40){ // If it's the down key
		if(commandIndex < prevCommands.length){
			commandIndex++;
			$('#commands').val(prevCommands[commandIndex]);
		}
		event.preventDefault(); // Stops enter from doing what it normally does
	}
	
});

// THE GUBBINS
var game = new Game(commandListJSON, mapJSON);
var playerLocX = game._player.character.getLoc('x');
var playerLocY = game._player.character.getLoc('y');
var data = game._areas[playerLocY][playerLocX].printDetails();
$('#text').append(data); // Append on to the end of existing content

(function(){ // When document is done loading, load main.php
})();

function updateTerminal(commandsInput){
	var commands = commandsInput.value;
	data = game._parser.parseCommands(commands);
 	$('#text').append(data); // Append on to the end of existing content
	$('#commands').val("");	// Clear input box
	$('#terminal').scrollTop( $('#terminal').prop("scrollHeight") ); // Scroll to bottom of terminal
}

function clearScreen(){
	$('#text').html("");
}

function toggleFullscreen(){
	$('#terminal').toggleClass("fullscreen"); // Add/remove full screen class
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};