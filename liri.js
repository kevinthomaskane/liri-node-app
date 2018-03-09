require("dotenv").config();
var keys = require("./keys.js")
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request")
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var command = process.argv[2]

if (command === "my-tweets") {
    fs.appendFile("log.txt", " my-tweets: ", function (err) {
    });
    var params = { screen_name: 'ktkane3' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (let i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                fs.appendFile("log.txt", " " + tweets[i].text + ",", function (err) {
                });
            }
        }
    });
}

if (command === "spotify-this-song") {
    fs.appendFile("log.txt", " spotify-this-song: ", function (err) {
    });
    var song = "The Sign"
    if (process.argv[3]) {
        process.argv.splice(0, 3)
        song = process.argv.join(" ")
    }
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].artists[0].name)
        fs.appendFile("log.txt", " " + data.tracks.items[0].artists[0].name + ",", function (err) {
        });
        console.log(data.tracks.items[0].name)
        fs.appendFile("log.txt", " " + data.tracks.items[0].name + ",", function (err) {
        });
        console.log(data.tracks.items[0].external_urls.spotify)
        fs.appendFile("log.txt", " " + data.tracks.items[0].external_urls.spotify + ",", function (err) {
        });
        console.log(data.tracks.items[0].album.name)
        fs.appendFile("log.txt", " " + data.tracks.items[0].album.name, function (err) {
        });
    });

}

if (command === "movie-this") {
    fs.appendFile("log.txt", " movie-this: ", function (err) {
    });
    var movie = "Mr. Nobody"
    if (process.argv[3]) {
        process.argv.splice(0, 3)
        movie = process.argv.join(" ")
    }
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    request(queryURL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(JSON.parse(body).Title);
            fs.appendFile("log.txt", " " + JSON.parse(body).Title + ",", function (err) {
            });
            console.log(JSON.parse(body).Year);
            fs.appendFile("log.txt", " " + JSON.parse(body).Year + ",", function (err) {
            });
            console.log(JSON.parse(body).Ratings[0].Value);
            fs.appendFile("log.txt", " " + JSON.parse(body).Ratings[0].Value + ",", function (err) {
            });
            console.log(JSON.parse(body).Ratings[1].Value);
            fs.appendFile("log.txt", " " + JSON.parse(body).Ratings[1].Value + ",", function (err) {
            });
            console.log(JSON.parse(body).Country);
            fs.appendFile("log.txt", " " + JSON.parse(body).Country + ",", function (err) {
            });
            console.log(JSON.parse(body).Plot);
            fs.appendFile("log.txt", " " + JSON.parse(body).Plot + ",", function (err) {
            });
            console.log(JSON.parse(body).Actors);
            fs.appendFile("log.txt", " " + JSON.parse(body).Actors, function (err) {
            });
        }
    })
}

if (command === "do-what-it-says") {
    fs.appendFile("log.txt", " do-what-it-says: ", function (err) {
    });
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
        spotify.search({ type: 'track', query: dataArr[1] }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log(data.tracks.items[0].artists[0].name)
            fs.appendFile("log.txt", " " + data.tracks.items[0].artists[0].name + ",", function (err) {
            });

            console.log(data.tracks.items[0].name)
            fs.appendFile("log.txt", " " + data.tracks.items[0].name + "," , function (err) {
            });

            console.log(data.tracks.items[0].external_urls.spotify)
            fs.appendFile("log.txt", " " + data.tracks.items[0].external_urls.spotify + ",", function (err) {
            });

            console.log(data.tracks.items[0].album.name)
            fs.appendFile("log.txt", " " + data.tracks.items[0].album.name, function (err) {
            });

        });

    });
}


