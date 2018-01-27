"use strict"

//Entry point: Lambda functions should have the signature "exports.handler = function() { ... }" 
exports.handler = (event, context) => {
    
    //Calling the MovieVision class that handles all incoming requests
    var movieVision = new MovieVision(event, context);
    movieVision.process();

}