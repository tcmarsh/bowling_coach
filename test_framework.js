/* This file stores all of the test framework that I've created for this project
 * I may be moving this out for testing other projects at some point
 */

/* This class is used to track and eventually output the results of the tests
 * <addResult( result )> adds a result (either a failure or success) to the list
 * <getResults> is used to output the failures and successes in a consistent format
 */
var TestResult = function()
{
    var failures = {};
    var successes = []
    
    this.addResult = function(testName, result)
    {
        if (testName === null ||
				result !== null && result.found === undefined)
        {
			if (Array.isArray(result))
			{
				for (var i = 0, j = result.length; i < j; i++)
				{
					this.addResult(testName + "_" + i, result[i]);
				}
				return;
			}

            alert("Bad result " + result + ", test results may be invalid");
            return;
        }

        if (result === null)
        {
            successes.push(testName);
        }
        else
        {
            failures[testName] = result;
        }
    };
    
    this.getResults = function()
    {
        var failureString = "";
        for (var name in failures)
        {
            if (failures.hasOwnProperty(name))
            {
                failureString += name + ":\n";
                failureString += "Expected '" + failures[name].expected +
                        "', found '" + failures[name].found + "'\n";
            }
        }
        if (failureString !== "")
        {
            failureString = "Tests failed as follows:\n\n" + failureString;
        }
      
        var successString = "";
        for (var i = 0, j = successes.length; i < j; i++)
        {
            successString += successes[i] + "\n";
        }
		if (successString.length !== "")
		{
			successString = "The following tests succeeded:\n\n" +
					successString;
		}
        
		var resultString = failureString +
				(failureString.length > 0 ? "\n\n" : "") +
				successString;
		return resultString.length > 0 ? resultString :
				"No test successes or failures were reported.\n";
    };
};

/* Represents a test failure
 * basically a wrapper for consitency in passing to the result container
 */
var TestFailure = function(expected, found)
{
    this.expected = expected;
    this.found = found;
};

var Test = {
	assertEquals: function(expectedValue, testValue)
	{
		if (testValue !== expectedValue)
		{
			return new TestFailure(expectedValue, testValue);
		}
		return null;
	},
	assertArrayEquals: function(expectedArray, testArray)
	{
		if (!Array.isArray(expectedArray))
		{
			return new TestFailure("an array", testArray);
		}

		for (var i = 0, j = expectedArray.length; i < j; i++)
		{
			if (testArray[i] !== expectedArray[i])
			{
				return new TestFailure(expectedArray[i], testArray[i]);
			}
		}

		return null;
	}
};

/* Runs all tests in the tests variable
 * To run more tests, add them as a function, then add them to the list
 * Tests must return a TestResult object
 */
function runTests(tests)
{
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
