
require.paths.unshift(__dirname + '/../lib');

/**
 * Future example
 * Shows how we can postpone yielding and call multiple functions in parallel
 * And then wait for all results in a single point
 *
 */

var Sync = require('sync');

// Simple asynchronous function example
function someAsyncFunction(a, b, callback) {
    setTimeout(function(){
        callback(null, a + b);
    }, 1000)
}

// Here we need to start new Fiber inside of which we can do our tests
Sync(function(){
    
    // no-yield here, call asynchronously
    var foo = someAsyncFunction.future(null, 2, 3);
    var bar = someAsyncFunction.future(null, 4, 4);
    
    // we are immediately here
    
    // foo, bar - our tickets to the future!
    console.log(foo); // { [Function: Future] result: [Getter], error: [Getter] }
    
    // Yield here
    console.log(foo.result, bar.result); // '5 8' after 1 sec (not two)
    
})