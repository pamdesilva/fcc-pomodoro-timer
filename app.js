$(document).ready(function() {

	var displayTime = $('#timer').html();
	var time = displayTime.split(':');
	var mins = parseInt(time[0], 10);
	var secs = parseInt(time[1], 10);
	var beginTimer;
	var pomodoro;
	var audio = new Audio('http://helios.informatik.uni-kl.de/~c_schrei/old/misc/sounds/ALARM.WAV');

	// Disable reset button on page load
	$('.reset').attr('disabled', 'disabled');

	// Begin timer on start
	$('.start').click(function() {
		$('.reset').removeAttr('disabled');
		pomodoro = mins;
		console.log('Secs is ' + secs);
		console.log('Counting down ' + pomodoro + ' mins');
		start();
		running(true);
	});

	// Reset timer
	$('.reset').click(function() {
		stop();
		mins += 1;
		console.log('Resetting back to ' + pomodoro + ' mins');
		console.log('Secs is ' + secs);
		running(false);
	});

	// Decrease pomodoro minutes
	$('.minus').click(function() {
		if (mins > 1) {
			mins -= 1;
			$('#timer').html(mins + ':' + '00');
		}
		console.log('Reducing to ' + mins + ' mins');
	});

	// Increase pomodoro minutes
	$('.plus').click(function() {
		console.log(mins);
		mins += 1;
		$('#timer').html(mins + ':' + '00');
	});

	// Start timer
	function start() {
		beginTimer = setInterval(function() {
			timer()
		}, 1000);
		running(true);
	}

	// Stop timer function
	function stop() {
		clearInterval(beginTimer);
		console.log('Stopping time');
		secs = 0;
		$('#timer').html(pomodoro + ':' + '00');
		running(false);
	}

	// Function to run timer
	function timer() {
		--secs;
		mins = (secs < 0) ? --mins : mins;
		if (mins < 0) {
			stop();
			mins += 1;
			audio.play();
		}
		secs = (secs < 0) ? 59 : secs;
		secs = (secs < 10) ? '0' + secs : secs;
		$('#timer').html(mins + ':' + secs);
		displayTime = mins + ':' + secs;
	}

	// Disable start/reset buttons
	function running(x) {
		if (x == true) {
			$('.btns').attr('disabled', 'disabled');
		}
		if (x == false) {
			$('.btns').removeAttr('disabled');
		}
	}

});
