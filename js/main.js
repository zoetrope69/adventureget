(function(){ // First things first!
	// Add class for the fancy transitions, this prevents the transition happening when loading
	$('#terminal').addClass('terminal-transitions');
})()

// When the window is resized		
$(window).resize(function(){ scrollTerminalBottom(); });
// When clicking the main terminal
$('#terminal').click(function(){ $('#commands').focus(); }); // Focus input #commands

var prevCommands, commandIndex, key;

key = {}
key.enter = 13;
key.uparrow = 38;
key.downarrow = 40;

prevCommands = []; // List of entered commands
commandIndex = 0;

// If someone presses enter when inputting
$('#commands').keydown(function(event) { // When keys are pressed in the input #commands
	var keyPressed = event.keyCode || event.which; // Checks for key

	if(keyPressed == key.enter || keyPressed == key.uparrow || keyPressed == key.downarrow){
		event.preventDefault(); // Stops enter from doing what it normally does		
	}

	switch(keyPressed){
		case key.enter:
			var enterValue = this.value.trim();
				if(enterValue !== ""){ // Add the entered command to the commands array
					prevCommands[prevCommands.length] = enterValue;
					commandIndex = prevCommands.length;
				}
				updateTerminal(this.value); // Commands away!
		break;
		case key.uparrow:
			if(commandIndex > 0){
				commandIndex--;
				$('#commands').val(prevCommands[commandIndex]);
			}
		break;
		case key.downarrow:
			if(commandIndex < prevCommands.length){
				commandIndex++;
				$('#commands').val(prevCommands[commandIndex]);
			}
		break;
	}
});

var game;

// Intialisation of game
$.getJSON("js/map.json", function(json){
	game = new Game(json);
	var data = game.launch();
	$('#text').append(data); // Append on to the end of existing content
});

function updateTerminal(input){
	var data = game._parser.parseCommands(input);
 	$('#text').append(data); // Append on to the end of existing content
	$('#commands').val("");	// Clear input box
	scrollTerminalBottom();
}

function scrollTerminalBottom(){
	$('#terminal').scrollTop( $('#terminal').prop("scrollHeight") ); // Scroll to bottom of terminal
}

function clearScreen(){ $('#text').html(""); }

function toggleColourScheme(){ // toggle colour scheme
	$('#terminal').toggleClass("light");
	$('#terminal').find('label').toggleClass("light");
	$('#commands').toggleClass("light");
}

var fullscreen = false;
function toggleFullscreen(){ 
	if(!fullscreen){ // Make the actual page fullscreen
		var d = document.documentElement;
			 if(d.requestFullscreen){ d.requestFullscreen(); }
		else if(d.mozRequestFullScreen){ d.mozRequestFullScreen(); }
		else if(d.webkitRequestFullScreen){ d.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT); }
		fullscreen = true;
	}else{ // Exit full screen mode of actual page
		 if(document.exitFullscreen){ document.exitFullscreen(); }
	else if(document.mozCancelFullScreen){ document.mozCancelFullScreen(); }
	else if(document.webkitCancelFullScreen){ document.webkitCancelFullScreen(); }
		fullscreen = false;
	}
		$('#terminal').toggleClass("fullscreen"); // Make terminal grow/shrink
		$('header').delay(50).slideToggle(250); // Slide header up/down
}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

// credit: peter bailey - http://stackoverflow.com/questions/202605/repeat-string-javascript
String.prototype.repeat = function(num){
    return new Array(parseInt(num)+ 1).join(this);
}