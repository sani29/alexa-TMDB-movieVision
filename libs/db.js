"use strict"
// TODO...........It Is Just an Example ************************
//Don't get too EMOTIONAL ********************
var redis = require('redis')

//You can either initiate a new Redis instance or new MongoDB instance or any other db of your choice
var db = new Redis() //new MongoDB()

module.exports = {
    setFavouriteGenre: db.setFavouriteGenre
}

function Redis(){  //we have to use postgre database for hasura alexa app. So modify this function accordingly

    var redisClient = redis.createClient(process.env.REDIS_URL)

    //Include all these 4 methods if you are implmenting your own db class
    this.setFavouriteGenre = setFavouriteGenre

    function setFavouriteGenre(userId, genreId){
        //Get the current favorite genre of a user
        redisClient.set('favourite-genre:' + userId, genreId)
    }
}

function MongoDB(){     //we have to use postgre database for hasura alexa app. So modify this function accordingly

    this.setFavouriteGenre = setFavouriteGenre

    function setFavouriteGenre(userId, genreId){
        //TODO
    }
}