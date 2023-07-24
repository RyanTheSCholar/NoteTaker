const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const router = require('./routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/api', router);
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/assets/index.html'))
);
app.get('/notes', (req, res) => 
res.sendFile(path.join(__dirname, '/public/assets/notes.html')))

app.listen(PORT, () =>
  console.log(`http://localhost:${PORT}`)
);
