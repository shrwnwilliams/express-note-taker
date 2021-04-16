const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

var PORT = process.env.PORT || 5555;

const notes = [];

app.use(express.static(path.join(__dirname, 'public')));

// 5 api routes in total, 2 to get the html pages
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "./public/index.html")));

app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "./public/notes.html")));

// gets all notes at /notes
app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data))
    })
    
});

// post notes, same url
app.post("/notes", (req, res) => {
    const newNote = req.body;

    notes.push(newNote);
})

app.delete("/api/notes/:id")
// 3rd route to delete which takes an id as a route param

app.listen(PORT, () => console.log(`App listening on ${PORT}`));