const express = require("express");
// const path = require("path");
const db = require("./db/db.json");
const uuid = require("./helpers/uuid");
const router = express.Router();
const fs = require("fs");

router.get("/notes", (req, res) => {
    fs.readFile('./db/db.json', "utf-8", (err, data) => {
        if(err){
            res.send(err)
            return
        }
        res.json(JSON.parse(data));
    })
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
    fs.readFile('./db/db.json', "utf-8", (err, data) => {
      if (err) {
        res.send(err);
        return
      }
        let newData = JSON.parse(data);
        newData.push(note);
        console.log(newData);
        const stringData = JSON.stringify(newData, null, "\t");
      fs.writeFile('./db/db.json', stringData, (err) =>
        err
          ? console.error(err)
          : res.json(note)
      );
    });
  }
});
// router.delete("/notes/:id", (req, res)=>{
//     const { note_id } = req.body;
//     if(){
        
//     }
// })

module.exports = router;
