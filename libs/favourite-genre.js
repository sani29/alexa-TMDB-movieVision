"use strict"

const CONSTANTS = require('./constants'),
      _ = require('underscore')._,
      MDB = require('./movies-db'),
      DB = require('./db.js')

const logger = require('./logger')

class FavouriteGenre{

    constructor(movieVision){
        this.movieVision = movieVision
    }

    process(){
        var movieVision = this.movieVision
        var self = this
        switch(movieVision.event.request.intent.name){
            case CONSTANTS.FAVOURITE_GENRE:{
                logger.log('Favourite Genre called')
                var sessionAttribute = {
                    intentSequence: CONSTANTS.MOVIE_RECOMMENDATION  // this line is for for extended app idea
                }
                if(movieVision.event.request.intent.slots.Genre && movieVision.event.request.intent.slots.Genre.value){
                    MDB.getGenreId(movieVision.event.request.intent.slots.Genre.value.toLowerCase())
                    .then(genreId => {
                        if(genreId !== -1){
                            DB.setFavouriteGenre(movieVision.event.session.user.userId, genreId)
                            movieVision.context.succeed(
                                movieVision.generateResponse(
                                    movieVison.buildSpeechletResponse(movieVison.event.request.intent.slots.Genre.value.toLowerCase() + ' is set as your favourite genre. thank you.', true),
                                    sessionAttribute
                                )
                            )
                        }
                        else{
                            movieVision.context.succeed(
                                movieVision.generateResponse(
                                    movieVison.buildSpeechletResponse('sorry cannot find the genre', true),
                                    {}
                                )
                            )
                        }
                    })
                }
                else{
                    movieVision.context.succeed(
                        movieVison.generateResponse(
                            movieVison.buildSpeechletResponse('sorry cannot find the genre', true),
                            {}
                        )
                    )
                }
            }
        }
    }

}

module.exports = FavouriteGenre