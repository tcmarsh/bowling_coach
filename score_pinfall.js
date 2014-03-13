document.addEventListener('DOMContentLoaded', function(event) {
	var pinSize = 20;

	var pins = initializePins(pinSize);
	drawPins(pins, pinSize);

	document.getElementById('pinfall').addEventListener('click',
		function(event) { checkPinfall(event, pins, pinSize); });

	var frames = [];
	document.getElementById('save').addEventListener('click',
		function saveListener() {
			var frame = frames.length <= 0 ? {} : frames[frames.length - 1];
			if (frames.length <= 0) { frames.push(frame); }

			var newFrame = false;
			if (frame.first == null) {
				frame.first = savePinfall(pins);
				newFrame = frame.first === 10;
				clearPins(pins, pinSize);
			}
			else if (frame.second == null) {
				frame.second = savePinfall(pins);
				newFrame = true;
				clearPins(pins, pinSize);
			}

			for (var property in frame) {
				if (frame.hasOwnProperty(property)) {
					alert(property + ": " + frame[property]);
				}
			}
			if (newFrame && frames.length < 10) {
				var canvas = document.getElementById('pinfall');
				canvas.getContext('2d')
						.clearRect(0, 0, canvas.width, canvas.height);
				pins = initializePins(pinSize);
				drawPins(pins, pinSize);

				frames.push({});
			}
			else if (newFrame) {
				alert(scoreGame(frames));
			}
		});
}, false);

function initializePins(pinSize) {
	var pinNumber = 10;
	var pins = new Array(pinNumber--);

	var xOffset = 0;
	for (var yNumber = 1; yNumber <= 4; yNumber++) {
		var yPosition = yNumber * pinSize * 2;
		xOffset += pinSize * 3 / 2;
		for (var xNumber = 5 - yNumber; xNumber > 0; xNumber--) {
			var pin = {isStanding: true};
			var xPosition = xNumber * pinSize * 3 + xOffset;

			pin.xPosition = xPosition;
			pin.yPosition = yPosition;

			pins[pinNumber--] = pin;
		}
	}

	return pins;
}

function drawPins(pins, pinSize) {
	var canvas = document.getElementById('pinfall');
	var context = canvas.getContext('2d');
	var topSize = pinSize * 3 / 5;

	context.beginPath();
	for (var i = 0, j = pins.length; i < j; i++) {
		var xPos = pins[i].xPosition,
			yPos = pins[i].yPosition;
		context.moveTo(xPos + pinSize, yPos);
		context.arc(xPos, yPos, pinSize, 0, Math.PI * 2);
		context.moveTo(xPos + topSize, yPos);
		context.arc(xPos, yPos, topSize, 0, Math.PI * 2);

		context.textAlign = "center";
		context.textBaseline = "middle";
		context.font = topSize + "pt Times New Roman";
		context.fillText(i + 1, xPos, yPos);
	}
	context.stroke();
}

function checkPinfall(event, pins, pinSize) {
	var canvas = document.getElementById('pinfall');
	var xPos = event.pageX - getTotalOffset(canvas, "Left");
	var yPos = event.pageY - getTotalOffset(canvas, "Top");

	for (var i = 0, j = pins.length; i < j; i++) {
		var minX = pins[i].xPosition - pinSize,
			maxX = pins[i].xPosition + pinSize,
			minY = pins[i].yPosition - pinSize,
			maxY = pins[i].yPosition + pinSize;
		if (xPos > minX && xPos < maxX &&
			yPos > minY && yPos < maxY) {
			pins[i].isStanding = false;

			context = canvas.getContext('2d');
			context.beginPath();

			context.arc(pins[i].xPosition, pins[i].yPosition,
					pinSize, 0, Math.PI * 2);
			context.fill();	
		}
	}
}

function getTotalOffset(element, direction) {
	var offset = 0;
	do {
		offset += element["offset" + direction];
		element = element.offsetParent
	}
	while (element !== null);

	return offset;
}

function savePinfall(pins) {
	var score = 0;
	for (var i = 0; i < pins.length; i++) {
		if (pins[i].isStanding) {
			continue;
		}
		score++;
		pins.splice(i, 1);
		i--;
	}

	return score;
}
function clearPins(pins, pinSize) {
	for (var i = 0; i < pins.length; i++) {
		if (pins[i].isStanding) {
			continue;
		}
		var context = document.getElementById('pinfall').getContext('2d');

		context.beginPath();
		context.clearRect(pins[i].xPosition - pinSize - 1,
				pins[i].yPosition - pinSize - 1,
				pinSize * 2 + 2, pinSize * 2 + 2);
	}
}

function scoreGame(frames) {
	if (frames.length < 10) {
		return "Unable to score a game without 10 frames.\n";
	}

	var score = 0;
	for (var i = 0, j = frames.length; i < j; i++) {
		var frame = frames[i];

		score += frame.first;
	}

	return score;
}

// Test functions after this
function testScoreGame() {
	var frames = [];
	for (var i = 0; i < 10; i++) {
		frames.push({first:10});
	}
	frames[9].second = 10;
	frames[9].third = 10;

	var threeHundred = scoreGame(frames);
	if (threeHundred !== 300) {
		return "Expected 300, got " + threeHundred;
	}

	return null;
}
function testScorePinfall() {
	var initTestPins = function() {
		var pins = [];
		
		for (var i = 0; i < 10; i++) {
			pins[i] = {isStanding: true};
		}

		return pins;
	};
	var pins = initTestPins();

	var score = savePinfall(pins);
	if (score !== 0) {
		return "Expected 0, got " + score + " pins.";
	}

	pins = initTestPins();
	pins[0].isStanding = false;
	score = savePinfall(pins);
	if (score !== 1) {
		return "Expected 1, got " + score + " pins.";
	}

	pins = initTestPins();
	var length = pins.length;
	for (var i = 0; i < pins.length; i++) {
		pins[i].isStanding = false;
	}
	score = savePinfall(pins);
	if (score !== length) {
		return "Expected " + pins.length + ", got " + score + " pins.";
	}

	return null;
}

function runTests() {
	var errors = [];
	var tests = {"scoreGame": testScoreGame,
			"scorePinfall": testScorePinfall};

	for (var name in tests) {
		if (!tests.hasOwnProperty(name)) {
			continue;
		}

		var testResult = tests[name]();
		if (testResult !== null) {
			errors.push(name + ": " + testResult);
		}
	}

	var errorString = "";
	for (var i = 0, j = errors.length; i < j; i++) {
		errorString += errors[i] + "\n";
	}
	alert(errorString === "" ? "No errors found." :
			"The following errors were found:\n\n" + errorString);
}

runTests();
