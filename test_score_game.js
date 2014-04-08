/* test_score_pinfall.js
 * Test all non-ui methods in score_pinfall.js
 */

function testScoreZeroGame()
{
    var frames = initializeZeroFrames();
    
	return Test.assertEquals(0, scoreGame(frames));
}

function testScoreOneGame()
{
	var frames = initializeZeroFrames();
    frames[0].first = 1;
    
	return Test.assertEquals(1, scoreGame(frames));
}
function testScoreTwoGame()
{
	var frames = initializeZeroFrames();
	frames[0].first = 1;
	frames[0].second = 1;

	return Test.assertEquals(2, scoreGame(frames));
}

function testScoreTenGame()
{
	var frames = initializeFrames(1, 0);

	return Test.assertEquals(10, scoreGame(frames));
}
function testScoreTwentyGame()
{
	var frames = initializeFrames(1, 1);

	return Test.assertEquals(20, scoreGame(frames));
}

function testScoreThirtyGame()
{
	var frames = initializeZeroFrames();
	frames[9].first = 10;
	frames[9].second = 10;
	frames[9].third = 10;

	return Test.assertEquals(30, scoreGame(frames));
}

function testScoreStrikePlusOne()
{
	var frames = [];
	frames.push({first: 10});
	frames.push({first: 1, second: 0});

	return Test.assertEquals(12, scoreGame(frames));
}
function testScoreStrikePlusTwo()
{
	var frames = [];
	frames.push({first: 10});
	frames.push({first: 1, second: 1});

	return Test.assertEquals(14, scoreGame(frames));
}
function testScore300()
{
	var frames = initializeFrames(10, 10);
	frames[9].third = 10;

	return Test.assertEquals(300, scoreGame(frames));
}

/* The section that follows tests games I've played (or watched)
 * Not very impressive, right now. Hopefully I improve.
 */
function test108()
{
	var frames = [{first: 5, second: 4}, {first: 10},
			{first: 3, second: 1}, {first: 10}, {first: 9, second: 0},
			{first: 9, second: 0}, {first: 9, second: 0},
			{first: 9, second: 0}, {first: 1, second: 6},
			{first: 7, second: 3, third: 9}];

	return Test.assertEquals(108, scoreGame(frames));
}
function test144()
{
	var frames = [{first: 9, second: 0}, {first: 9, second: 1},
			{first: 9, second: 0}, {first: 0, second: 7},
			{first: 8, second: 0}, {first: 8, second: 0},
			{first: 10}, {first: 10}, {first: 8, second: 2},
			{first: 6, second: 4, third: 10}];

	return Test.assertEquals(144, scoreGame(frames));
}
function test95()
{
	var frames = [{first: 9, second: 0}, {first: 8, second: 0},
			{first: 7, second: 0}, {first: 7, second: 0},
			{first: 7, second: 3}, {first: 2, second: 0},
			{first: 7, second: 3}, {first: 7, second: 3},
			{first: 6, second: 2}, {first: 6, second: 3}];

	return Test.assertEquals(95, scoreGame(frames));
}
function test201()
{
	var frames = [{first: 7, second: 3}, {first: 9, second: 1},
			{first: 9, second: 1}, {first: 10}, {first: 10}, {first: 10},
			{first: 6, second: 4}, {first: 10}, {first: 7, second: 2},
			{first: 8, second: 2, third: 9}];

	return Test.assertEquals(201, scoreGame(frames));
}
function test83()
{
	var frames = [{first: 4, second: 4}, {first: 9, second: 0},
			{first: 4, second: 3}, {first: 1, second: 0},
			{first: 4, second: 3}, {first: 1, second: 9},
			{first: 7, second: 3}, {first: 1, second: 7},
			{first: 9, second: 0}, {first: 1, second: 5}];

	return Test.assertEquals(83, scoreGame(frames));
}
function test138()
{
	var frames = [{first: 10}, {first: 6, second: 3},
			{first: 0, second: 7}, {first: 9, second: 0},
			{first: 10}, {first: 8, second: 1}, {first: 10}, {first: 10},
			{first: 9, second: 0}, {first: 6, second: 3}];

	return Test.assertEquals(138, scoreGame(frames));
}
function test141()
{
	var frames = [{first: 6, second: 3}, {first: 10}, {first: 10},
			{first: 9, second: 1}, {first: 9, second: 1},
			{first: 4, second: 4}, {first: 10}, {first: 8, second: 1},
			{first: 0, second: 5}, {first: 9, second: 0}];

	return Test.assertEquals(141, scoreGame(frames));
}
function test107()
{
	var frames = [{first: 4, second: 5}, {first: 10}, {first: 0, second: 8},
			{first: 8, second: 2}, {first: 8, second: 0},
			{first: 9, second: 0}, {first: 7, second: 1},
			{first: 2, second: 0}, {first: 7, second: 2},
			{first: 9, second: 1, third: 8}];

	return Test.assertEquals(107, scoreGame(frames));
}
function test149()
{
	var frames = [{first: 9, second: 0}, {first: 8, second: 1},
			{first: 7, second: 2},
			{first: 9, second: 1}, {first: 10}, {first: 10},
			{first: 8, second: 0}, {first: 5, second: 4},
			{first: 8, second: 2}, {first: 9, second: 1, third: 10}];

	return Test.assertEquals(149, scoreGame(frames));
}

function initializeZeroFrames()
{
	return initializeFrames(0, 0);
}
function initializeFrames(first, second)
{
    var frames = [];
    for (var i = 0; i < 10; i++) {
        frames[i] = {"first": first, "second": second};
    }
	return frames;
}

var tests = [testScoreZeroGame, testScoreOneGame, testScoreTwoGame,
	testScoreTenGame, testScoreTwentyGame, testScoreThirtyGame,
	testScoreStrikePlusOne, testScoreStrikePlusTwo,
	testScore300,
	test108, test144, test95, test201, test83, test138, test141,
	test107, test149];

runTests(tests);
