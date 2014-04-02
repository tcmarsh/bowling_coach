document.addEventListener('DOMContentLoaded', function(event)
{
	var context = document.getElementById('pinset');
	var minSize = context.width > context.height ?
			context.height : context.width;
	var pinSize = minSize / 10;

	var pins = initializePins(pinSize);
	drawPins(pins, pinSize);

	document.getElementById('pinset').addEventListener('click',
		function(event)
		{
			checkPinfall(event, pins, pinSize);
		});

	var frames = [];
	document.getElementById('saveButton')
		.addEventListener('click', function(event)
		{
			alert(scoreGame(frames));
		});
}, false);

function initializePins(pinSize)
{
	var pinNumber = 10;
	var pins = new Array(pinNumber--);

	var xOffset = 0;
	for (var yNumber = 1; yNumber <= 4; yNumber++)
	{
		var yPosition = yNumber * pinSize * 2;
		xOffset += pinSize * 3 / 2;
		for (var xNumber = 5 - yNumber; xNumber > 0; xNumber--)
		{
			var pin = {isStanding: true};
			var xPosition = xNumber * pinSize * 3 + xOffset;

			pin.xPosition = xPosition;
			pin.yPosition = yPosition;

			pins[pinNumber--] = pin;
		}
	}

	return pins;
}

function drawPins(pins, pinSize)
{
	var canvas = document.getElementById('pinset');
	var context = canvas.getContext('2d');
	var topSize = pinSize * 3 / 5;

	context.beginPath();
	for (var i = 0, j = pins.length; i < j; i++)
	{
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

function checkPinfall(event, pins, pinSize)
{
	var canvas = document.getElementById('pinset');
	var xPos = event.pageX - getTotalOffset(canvas, "Left");
	var yPos = event.pageY - getTotalOffset(canvas, "Top");

	for (var i = 0, j = pins.length; i < j; i++)
	{
		var minX = pins[i].xPosition - pinSize,
			maxX = pins[i].xPosition + pinSize,
			minY = pins[i].yPosition - pinSize,
			maxY = pins[i].yPosition + pinSize;
		if (xPos > minX && xPos < maxX &&
			yPos > minY && yPos < maxY)
		{
			pins[i].isStanding = false;

			context = canvas.getContext('2d');
			context.beginPath();

			context.arc(pins[i].xPosition, pins[i].yPosition,
					pinSize, 0, Math.PI * 2);
			context.fill();	
		}
	}
}

function getTotalOffset(element, direction)
{
	var offset = 0;
	do
	{
		offset += element["offset" + direction];
		element = element.offsetParent
	}
	while (element !== null);

	return offset;
}
/*function savePinfall(pins)
{
	var score = 0;
	for (var i = 0; i < pins.length; i++)
	{
		if (pins[i].isStanding)
		{
			continue;
		}
		score++;
		pins.splice(i, 1);
		i--;
	}

	return score;
}
function clearPins(pins, pinSize)
{
	for (var i = 0; i < pins.length; i++)
	{
		if (pins[i].isStanding)
		{
			continue;
		}
		var context = document.getElementById('pinset').getContext('2d');

		context.beginPath();
		context.clearRect(pins[i].xPosition - pinSize - 1,
				pins[i].yPosition - pinSize - 1,
				pinSize * 2 + 2, pinSize * 2 + 2);
	}
}*/
