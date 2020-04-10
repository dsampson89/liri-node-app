//Read and set any environment variables with the dotenv package:
require("dotenv").config();

//Import the `keys.js` file
var keys = require("./keys.js");

//Access keys information
var spotify = new Spotify(keys.spotify);

var inquirer = require("inquirer");
//Create Prompt
inquirer
    .prompt([
        {   
            //Select a certain command
            type: "list",
            message: "Choose a command",
            choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
            name: "liri commands"
          }
    ])