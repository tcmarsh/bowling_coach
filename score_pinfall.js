var pins = [];

function initializePins() {
	var canvas = document.getElementById('pinfall');
	var context = canvas.getContext('2d');

	var fullCircle = (Math.PI / 180) * 360;

	var rowPins = 4;
	var rowOffset = 0;
	var pinSize = 20;
	var topSize = pinSize - (pinSize / 3);
	var bandSize = (pinSize + topSize) / 2;
	var pinNumber = 10;

	context.beginPath();
	for (var yMult = 0; yMult < 4; yMult++, rowPins--) {
		var yPos = (3 * pinSize * yMult) + pinSize + 50;
		for (var xMult = rowPins; xMult > 0; xMult--) {
			context.strokeStyle = "black";

			var xPos = (4 * pinSize * xMult) + rowOffset;
			context.moveTo(xPos + pinSize, yPos);
			context.arc(xPos, yPos, pinSize, 0, 2 * Math.PI, false);
			context.moveTo(xPos + topSize, yPos);
			context.arc(xPos, yPos, topSize, 0, 2 * Math.PI, false);
			context.font = (pinSize - 1) + "px Times New Roman";
			context.fillText(pinNumber,
				xPos - (pinNumber === 10 ? topSize / 3 : 0) - (topSize / 3),
				yPos + (topSize / 2));

			pins[--pinNumber] = {xPos: xPos, yPos: yPos,
					size: pinSize, top: topSize, isStanding: true};
		}
		rowOffset += (2 * pinSize);
	}
	context.stroke();

	context.closePath();
	canvas.addEventListener("click", handlePinClick, false);
}

function handlePinClick(event) {
	var xPos = event.pageX;
	var yPos = event.pageY;

	var canvas = document.getElementById("pinfall");
	var startX = canvas.offsetLeft, startY = canvas.offsetTop;

	for (var i = 0; i < pins.length; i++) {
		var size = pins[i].size,
				minX = pins[i].xPos - size, maxX = pins[i].xPos + size,
				minY = pins[i].yPos - size, maxY = pins[i].yPos + size;
		if (xPos > minX + startX && xPos < maxX + startX &&
				yPos > minY + startY && yPos < maxY + startY) {
			pins[i].isStanding = !pins[i].isStanding;
			updatePin(pins[i], i + 1);
			break;
		}
	}
}

function updatePin(pin, pinNumber) {
	var context = document.getElementById("pinfall")
			.getContext("2d");

	context.beginPath();
	context.fillStyle = "black";
	var topSize = pin.topSize, xPos = pin.xPos, yPos = pin.yPos;

	if (pin.isStanding) {
		context.arc(xPos, yPos, pin.size, 0, Math.PI * 2, false);
		context.arc(xPos, yPos, topSize, 0, Math.PI * 2, false);
		context.stroke();
	}
	else {
		context.arc(xPos, yPos, pin.size, 0, Math.PI * 2, false);
		context.fill();

		context.fillStyle = "red";
		context.font = (pin.size - 1) + "px Times New Roman";
		context.fillText(pinNumber,
			xPos - (pinNumber === 10 ? topSize / 3 : 0) - (topSize / 3),
			yPos + (topSize / 2));
	}
	context.closePath();
}

function initializeScoreboard() {
	var context = document.getElementById("pinfall")
			.getContext('2d');

	var frameSize = 30;
	var boxSize = frameSize / 3;
	for (var frame = 1; frame <= 10; frame++) {
		context.strokeRect(frameSize * frame, 0, frameSize, frameSize);
		context.strokeRect(frameSize * frame + 2 * boxSize, 0,
			boxSize, boxSize);
	}
	context.strokeRect(frameSize * 10 + boxSize, 0, boxSize, boxSize);
}
