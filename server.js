// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
// var PORT = 3000;
var PORT = process.env.PORT || 3000

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
app.use(express.static('assets'));

var gameData;

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/gameover", function(req, res) {
    res.end("It Works!! Path Hit: " + req.url);
});

app.post("/api/gameInfo", function (req, res) {
    var newData = req.body;
    gameData.push(newData);
    let parsedata = JSON.stringify(gameData)
    fs.writeFile(path.join('db.json'), parsedata, (err) => {
        if (err) throw err;
    })

    res.json(gameData);
});

app.listen(PORT, function() {
console.log("App listening on PORT " + PORT);
});  