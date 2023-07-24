const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const uuid = require("./helpers/uuid");
const router = express.Router();
const fs = require("fs");

router.get("/notes", (req, res) => {
  return res.json(db);
});
router.post("/notes", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const note = {
      title,
      text,
      note_id: uuid(),
    };
    // const noteString = JSON.stringify(note);

    fs.readFile(db, "utf-8", (err, data) => {
      if (err) {
        res.send(err);
        return
      }
        let newData = JSON.parse(data);
        newData.push(note);
        console.log(newData);
        const stringData = JSON.stringify(newData, null, "\t");
      fs.writeFile(db, stringData, (err) =>
        err
          ? console.error(err)
          : console.log(
              `Review for ${note.title} has been written to JSON file`
            )
      );
    });
  }
});

module.exports = router;
