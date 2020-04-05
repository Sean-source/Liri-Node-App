const fs = require("fs");
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
    if (song == "" || song == null || song == undefined) {
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
spotifySong();

const file = function () {
    fs.readFile('random.txt', (err, data) => {
        if (err) throw err;
        console.log(data);
        let split = data.split(",");
        logic(split[0], split[1]);
    });

}

const logic = function (command1, command2) {

    if (command1 == "concert-this") {
        concert(command2);
    }
    else if (command1 == "spotify-this") {
        spotify(command2);
    }
    else if (command1 == ) {

    }
    else {

    }

}

logic(process.argv[2], process.argv[3]);