"use strict"

const CONSTANTS = require('./constants')
const logger = require('./logger')

//To process common scenarios like help, stop and cancel intent
class Common{

    constructor(movieVision){
        this.movieVision = movieVision
    }

    process(){
        var movieVision = this.movieVision;
        var self = this
        switch(movieVision.event.request.intent.name){
            case CONSTANTS.HELP_INTENT:{
                //When user asks for help say the help message
                logger.log('Help Intent called')
                var response = '<p>if you want to know about a movie simply say like </p><p>Alexa ask movie trivia about Avatar</p>'
                    + '<p>to set your favourite genre say something like </p><p>my favourite genre is science fiction</p>'
                movieVision.context.succeed(
                    movieVision.generateResponse(
                        movieVision.buildSpeechletResponse(response, false),
                        {}
                    )
                )
                break;
            }
            case CONSTANTS.STOP_INTENT:
            case CONSTANTS.CANCEL_INTENT:
            {
                //When encountering a STOP/CANCEL intent say Goodbye 
                logger.log('Cancel Intent called')
                movieVision.context.succeed(
                    movieVision.generateResponse(
                        movieVision.buildSpeechletResponse('Goodbye!', true),
                        {}
                    )
                )
                break;
            }
        }
    }

}

module.exports = Common