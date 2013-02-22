var prevCommands = new Array(); //list of entered commands
var commandIndex = 0;

(function(){ // When document is done loading, load main.php
	$('#text').load("main.php");
})();

// AJAX
function updateTerminal(commandsInput){
	$.post("main.php", { commands: commandsInput.value })
	.done(function(data) {		
	 	$('#text').append(data); // Append on to the end of existing content
		//$(data.trim()).hide().appendTo('#text').fadeIn(250); // fading, messes with scrolling
		$('#commands').val("");	// Clear input box
		$('#terminal').scrollTop( $('#terminal').prop("scrollHeight") ); // Scroll to bottom
		if(data.indexOf("clearthatshit") !== -1){ // If returned output has clearscreen in it
			$('#text').html(""); // Clear screen
		}
	});
}

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
		updateTerminal(this); // AJAX AWAY!
		event.preventDefault(); // Stops enter from doing what it normally does
	}
	if(code == 38){ // If it's the up key
		if(commandIndex > 0){
			commandIndex--;
			$('#commands').val(prevCommands[commandIndex]);
		}
		event.preventDefault(); // Stops enter from doing what it normally does
	}
	if(code == 40){ // If it's the up key
		if(commandIndex < prevCommands.length){
			commandIndex++;
			$('#commands').val(prevCommands[commandIndex]);
		}
		event.preventDefault(); // Stops enter from doing what it normally does
	}
	
});


