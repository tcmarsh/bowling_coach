function testOneDown()
{
	return testPinDown(1);
}

function testTwoDown()
{
	return testPinDown(2);
}

function testTenDown()
{
	return testPinDown(10);
}

function testPinDown(pinNumber, ball, frames)
{
	var balls = ["first", "second", "third"];
	ball = ball === undefined ? balls[0] : balls[ball - 1];
	var pins = [];
	for (var i = 0; i < 10; i++)
	{
		pins.push({isStanding: true});
	}
	pins[pinNumber - 1] = {isStanding: false};

	var pinsDown = [pinNumber];
	frames = frames === undefined ? [] : frames;
	return Test.assertArrayEquals(pinsDown,
			savePinfall(pins, frames)[0][ball + "PinsDown"]());
}

function testAllPinsDown(pinNumber)
{
	var pins = [];
	for (var i = 0; i < 10; i++)
	{
		pins.push({isStanding: false});
	}
	
	var pinsDown = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	var frames = [];
	return Test.assertArrayEquals(pinsDown,
			savePinfall(pins, frames)[0].firstPinsDown());
}

function testOnePinSecondBall()
{
	var frames = [new Frame()];
	frames[0].setPinsDown(0);

	return testPinDown(1, 2, frames);
}
function testNineSpare()
{
	var frames = [];
	var pins = [];
	for (var i = 0; i < 9; i++)
	{
		pins[i] = {isStanding: false};
	}
	pins[9] = {isStanding: true};

	frames = savePinfall(pins, frames);
	for ( var i = 0; i < 10; i++)
	{
		pins[i].isStanding = !pins[i].isStanding;
	}
	frames = savePinfall(pins, frames);

	var frame = frames[0];
	return [Test.assertArrayEquals(
				[1, 2, 3, 4, 5, 6, 7, 8, 9], frame.firstPinsDown()),
			Test.assertArrayEquals([10], frame.secondPinsDown())];
}

function testNewFrame()
{
	var frames = [];
	var pins = [];
	for (var i = 0; i < 10; i++)
	{
		pins[i] = {isStanding: true};
	}
	frames = savePinfall(pins, frames);
	frames = savePinfall(pins, frames);
	frames = savePinfall(pins, frames);

	var firstFrame = frames[0];
	var secondFrame = frames[1];
	return [Test.assertArrayEquals([], firstFrame.firstPinsDown()),
			Test.assertArrayEquals([], firstFrame.secondPinsDown()),
			Test.assertArrayEquals([], secondFrame.firstPinsDown())];
}

var tests = [testOneDown, testTwoDown, testTenDown, testAllPinsDown,
		testOnePinSecondBall, testNineSpare, testNewFrame];

runTests(tests);
