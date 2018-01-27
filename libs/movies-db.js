"use strict"
/* Here w erae using TMDB APis but for project we have to extract these data from hasura database */
/* so don't get EMOTIONAL. Lot of work to do */
//Sample hai bhai

var mdb = require('moviedb')(process.env.MDB_API_KEY),
    _ = require('underscore')._

module.exports = {
    searchMovies: searchMovies,
    movieCasts: movieCasts,
    getGenreId: getGenreId,
    getGenreName: getGenreName
}

function searchMovies(query){
    return new Promise((resolve, reject) => {
        mdb.searchMovie({
            query: query
        }, function(err, res){
            if(err) return reject(err)
            if(res && res.results && res.results.length > 0){
                resolve(
                    _.map(res.results.slice(0, 10), movie => {
                        return compactMovie(movie)
                    })
                )
            }
            else{
                reject('Not found')
            }
        })
    })
}

function movieCasts(movieId){
    return new Promise((resolve, reject) => {
        mdb.movieCredits({
            id: movieId
        }, function(err, res){
            if(err) return reject(err)
            resolve(_.chain(res.cast)
                        .sortBy('order')
                        .value()
                        .slice(0, 5))
        })
    })
}

// id's are not real
var genres = [
    {
      "id": 28,
      "name": "action"
    },
    {
      "id": 12,
      "name": "adventure"
    },
    {
      "id": 16,
      "name": "animation"
    },
    {
      "id": 35,
      "name": "comedy"
    },
    {
      "id": 80,
      "name": "crime"
    },
    {
      "id": 18,
      "name": "drama"
    },
    {
      "id": 10751,
      "name": "family"
    },
    {
      "id": 14,
      "name": "fantasy"
    },
    {
      "id": 27,
      "name": "horror"
    },
    {
      "id": 9648,
      "name": "mystery"
    },
    {
      "id": 10749,
      "name": "romance"
    },
    {
      "id": 878,
      "name": "science fiction"
    },
    {
      "id": 53,
      "name": "thriller"
    },
    {
      "id": 37,
      "name": "western"
    }
  ]

function getGenreId(genre){
    return new Promise((resolve, reject) => {
        var currentGenre = _.findWhere(genres, { name: genre.toLowerCase() })
        if(currentGenre)
            resolve(currentGenre.id)
        else
            resolve(-1)
    })
}

function getGenreName(genreId){
    genreId = parseInt(genreId)
    return new Promise((resolve, reject) => {
        var currentGenre = _.findWhere(genres, { id: genreId })
        if(currentGenre)
            resolve(currentGenre.name)
        else
            resolve('')
    })
}

function compactMovie(movie){
    var compactMovie = {
        id: movie.id,
        title: movie.title,
        original_title: movie.original_title,
        overview: movie.overview,
        release_date: movie.release_date,
        poster_path: movie.poster_path
    }
    return compactMovie
}