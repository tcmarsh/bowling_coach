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
	assertEquals: function(expectedValue, testValue) {
		if (testValue !== expectedValue)
		{
			return new TestFailure(expectedValue, testValue);
		}
		return null;
	}
};
