/* test_score_pinfall.js
 * Test all non-ui methods in score_pinfall.js
 */

function runTests()
{
    var failure = new TestFailure();
    
    if (failure.hasFailures()) {
        alert(failure.getFailureOutput());
    }
}

var TestFailure = function()
{
    var failures = [];
    this.addFailure = function(failure)
    {
        failures.push(failure);  
    };
    
    this.getFailureOutput = function()
    {
        var failureString = "";
        for (var i = 0, j = failures.length; i < j; i++)
        {
            failureString += failures[i] + "\n";
        }
      
        return failureString;
    };
    
    this.hasFailures = function() {
        return failures !== null && failures.length > 0;
    };
};

runTests();