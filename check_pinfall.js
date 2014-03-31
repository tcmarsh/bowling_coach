var canvas = document.getElementById("pinset");
var context = canvas.getContext("2d");

var pinSize = 15;
var innerSize = pinSize / 2;
context.beginPath();
for (var i = 4, numberOfPins = 4; i > 0; i--, numberOfPins--)
{
	var xPosition = pinSize * 3 * i - pinSize / 2 * (4 - numberOfPins);
	for (var j = 0; j < numberOfPins; j++)
	{
		var yPosition = 15 + pinSize * j * 2;
		context.moveTo(xPosition + pinSize, yPosition);
		context.arc(xPosition, yPosition, pinSize, 0, Math.PI * 2, true);
		context.moveTo(xPosition + innerSize, yPosition);
		context.arc(xPosition, yPosition, innerSize, 0, Math.PI * 2, true);
		context.stroke();
	}
}

context.closePath();
