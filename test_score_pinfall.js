/* test_score_pinfall.js
 * Test all non-ui methods in score_pinfall.js
 */

function testScoreZeroGame() {
    var frames = [];
    for (var i = 0; i < 10; i++) {
        frames[i] = {first: 0, second: 0};
    }
    
    var score = scoreGame(frames);
    if (score !== 0) {
        return new TestFailure(0, score);
    }
    return null;
}

function testScoreOneGame() {
    var frames = [];
    for (var i = 0; i < 10; i++) {
        frames[i] = {first: 0, second: 0};
    }
    frames[0].first = 1;
    
    var score = scoreGame(frames);
    if (score !== 1) {
        return new TestFailure(1, score);
    }
    return null;
}

/* Runs all tests in it's internal test list
 * To run more tests, add them as a function, then put that function in the list
 */
function runTests()
{
    var tests = [testScoreZeroGame, testScoreOneGame];
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
