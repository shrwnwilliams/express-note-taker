const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.get("/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

router.post("/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) throw err;
    const oldNotes = JSON.parse(data);
    const newNote = req.body;
    newNote.id = uuidv4();
    oldNotes.push(newNote);
    fs.writeFileSync("db/db.json", JSON.stringify(oldNotes), (err) => {
      if (err) throw err;
      res.sendStatus(200);
    });
  });
});

router.delete("/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) throw err;
        const notesArray = JSON.parse(data);
        const noteId = req.params.id;
        const newNoteArray = notesArray.filter((note) => note.id !== noteId);

        fs.writeFileSync("db/db.json", JSON.stringify(newNoteArray), (err) => {
            if (err) throw err;
            res.sendStatus(200);
        })
    })
})

module.exports = router;
