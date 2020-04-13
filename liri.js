//Read and set any environment variables with the dotenv package:
require("dotenv").config();

//Import the `keys.js` file
var keys = require("./keys.js");

//moment require file
var moment = require("moment");

//Access keys information
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

//axios require file
var axios = require('axios');

// fs read file
var fs = require("fs"); 

//concert this
var getMeConcertInfo = function(bandName){
    var queryURL = "https://rest.bandsintown.com/artists/" + bandName + "/events?app_id=codingbootcamp"; 

    axios.get(queryURL).then(
        function(response){
            console.log("Venue: " + response.data[0].venue.name);
            console.log("City: " + response.data[0].venue.city);
            console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
        }
    );
}

//spotify-this-song
var getartistName = function(artist){
    return artist.name;
}

var getMeSpotify = function(songName){

spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  var songs = data.tracks.items;
    for(var i=0; i<songs.length; i++){
        console.log(i);
        console.log("artist(s): " + songs[i].artists.map(getartistName));
        console.log("song name: " + songs[i].name);
        console.log("preview song " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("---------------------------------");
    }
  });
}

//movie-this
var getMeMovie = function(movieName) {

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";



axios.get(queryUrl).then(
    function(response) {
        console.log("Title: " + response.data.Title);
        console.log("Year: " + response.data.Year);
        console.log("IMBD Rating: " + response.data.imdbRating);
        console.log("Rotten tomatoes rating: " + response.data.tomatoRating);
        console.log("County: " + response.data.Country);
        console.log("Language: " + response.data.Language);
        console.log("Plot: " + response.data.Plot);
        console.log("Actors: " + response.data.Actors);
      })
      .catch(function(error) {
        if (error.response) {
          
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Status---------------");
          console.log(error.response.headers);
        } else if (error.request) {

          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      });
    }

    //Do what is says
var doWhatItSays = function(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        // We will then print the contents of data
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        if (dataArr.length == 2) {
            pick(dataArr[0], dataArr[1]);

        } else if (dataArr.length == 1){
            pick(dataArr[0]);
        }
      
      });
}

// switch statement for commands
var pick = function(caseData, functionData){
    switch(caseData){
        case "concert-this":
            getMeConcertInfo(functionData);
            break;
        case "spotify-this-song":
            getMeSpotify(functionData);
            break;
        case "movie-this":
            getMeMovie(functionData);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("LIRI does not know that")
    }
}


//user input
var runThis = function(argOne, argTwo){
    pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
