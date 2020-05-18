// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require("fs");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
// var PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('assets'));

var gameData;

app.get("/", function(req, res) {;
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/gameover", function(req, res) {
    // res.end("It Works!! Path Hit: " + req.url);
    fs.readFile(path.join(__dirname, "db.json"), "utf8", function (err, data) {
        if (err) throw err;
        gameData = JSON.parse(data);
        console.log(gameData);
    });
    res.sendFile(path.join(__dirname, "gameOver.html"));
});

app.get("/api/gameInfo", function (req, res) {
    res.json(gameData);
});

app.post("/api/gameInfo", function (req, res) {
    // console.log(req.body);
    var newData = req.body;
    
    // var gameData = [...newData];
    // console.log(JSON.stringify(newData));
    var gameData = JSON.parse(JSON.stringify(newData));
    // let parseData = JSON.parse(gameData);
    fs.writeFile(path.join('db.json'),JSON.stringify(gameData), (err) => {
        if (err) throw err;
    });

    res.json(gameData);

});

app.listen(PORT, function() {
console.log("App listening on PORT " + PORT);
});  