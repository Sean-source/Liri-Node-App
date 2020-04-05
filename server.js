const moment = require("moment");
require("dotenv").config();
const keys = require("./keys.js");
const Spotify = require("node-spotify-api");
const spotify = new Spotify(keys.spotify);

const axios = require("axios");

const concert = function (artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            let data = response.data;
            for (let i = 0; i < 10; i++) {
                console.log(data[i].venue.name);
                console.log(data[i].venue.city + ", " + data[i].venue.country);
                console.log(moment(data[i].datetime).format("MM/DD/YYYY"));
                console.log("\n");
            }
        })
}

// concert("Backstreet Boys");

const spotifySong = function (song) {
    if (song == "") {
        song = "The Sign";
    }
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < data.tracks.items[i].artists.length; j++) {
                console.log(data.tracks.items[i].artists[j].name);
            }
            console.log(data.tracks.items[i].name);
            console.log(data.tracks.items[i].preview_url);
            console.log(data.tracks.items[i].album.name);
            console.log("\n");

        }
    })
}
spotifySong("I want it that way");