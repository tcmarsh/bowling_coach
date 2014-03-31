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
function testScoreThreeHundred()
{
	var frames = initializeFrames(10, 10);
	frames[9].third = 10;

	return Test.assertEquals(300, scoreGame(frames));
}

/* The section that follows tests games I've played (or watched)
 * Not very impressive, right now. Hopefully I improve.
 */

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

/* Runs all tests in it's internal test list
 * To run more tests, add them as a function, then put that function in the list
 */
function runTests()
{
    var tests = [testScoreZeroGame, testScoreOneGame, testScoreTwoGame,
			testScoreTenGame, testScoreTwentyGame, testScoreThirtyGame,
			testScoreStrikePlusOne, testScoreStrikePlusTwo,
			testScoreThreeHundred];
    var result = new TestResult();
    
    try {
        for (var i = 0, j = tests.length; i < j; i++) {
            result.addResult(tests[i].name + "", tests[i]());
        }
    } catch (error) {
        alert("The following error prevented running all tests:\n\n" +
            error.message + "\n" +
            error.stack.split("\n")[1]);
        return false;
    }
    
    alert(result.getResults());
}

runTests();
