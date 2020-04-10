const fs = require("fs"); //Useful function to interact with the file system
const moment = require("moment"); //Grabs the moment JS module
require("dotenv").config(); //Loads environment variables from a .env file
const keys = require("./keys.js"); //
const Spotify = require("node-spotify-api"); //Grabs the spotify module
const spotify = new Spotify(keys.spotify); //Initializes a spotify object with the ID and secret


const axios = require("axios"); //Makes http request from node.js

const concert = function (artist) { //Creating a concert function to search based off of artist
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")//Makes http request to the respective url
        .then(function (response) { //Asynchronous callback
            let data = response.data; //Grabbing api data
            for (let i = 0; i < 10; i++) {
                console.log(data[i].venue.name); //Runs through all of the venue names that artist will be playing at
                console.log(data[i].venue.city + ", " + data[i].venue.country); //runs through the city and country 
                console.log(moment(data[i].datetime).format("MM/DD/YYYY"));// uses moment to reformat the date
                console.log("\n");
            }
        })
}


// concert("Backstreet Boys");

const spotifySong = function (song) {
    if (song == "" || song == null || song == undefined) {
        song = "The Sign"; //Sets the song to default son
    }
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < data.tracks.items[i].artists.length; j++) {
                console.log(data.tracks.items[i].artists[j].name); //Since there are multiple artists grabs all the artists
            }
            console.log(data.tracks.items[i].name); //Name of song
            console.log(data.tracks.items[i].preview_url); //Preview url of song
            console.log(data.tracks.items[i].album.name); //Album name
            console.log("\n");

        }
    })
}
// spotifySong();
const movie = function (movieName) {
    axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy")
        .then(function (response) {
            let data = response.data;

            console.log(data.Title);
            console.log(data.Released);
            for (let i = 0; i < data.Ratings.length; i++) {
                console.log(data.Ratings[i]);
            }
            console.log(data.Country);
            console.log(data.Language);
            console.log(data.Plot);
            console.log(data.Actors);
        })

}

//movie("Mr. Nobody")

const file = function () { //Creating function to read file
    fs.readFile("random.txt", (err, data) => { //Callback function
        if (err) throw err; //Checks if there is an error
        console.log(data); //
        let split = data.split(","); //Turns the string into an array
        logic(split[0], split[1]); //Calling the logic function
    });

}

const logic = function (command1, command2) {

    if (command1 == "concert-this") { //if the first item in the cmd input equals the concert-this command
        concert(command2);
    }
    else if (command1 == "spotify-this-song") {//if the first item in the cmd input equals the spotify-this then call the spotify function
        spotifySong(command2);
    }
    else if (command1 == "movie-this") {
        movie(command2);
    }
    else if (command1 == "do-what-it-says") {
        file();
    }
    else {
        console.log("Invalid Input");
    }

}


logic(process.argv[2], process.argv[3]);