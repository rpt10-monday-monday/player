const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 3002;
const bodyParser = require('body-parser');
const Songs = require('../mongoDB/Song.js')

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

app.get('/song', (req, res) => {
  Songs.find({ songID: 99 })
    .then((song) => {
      return new Promise((resolve, reject) => {
        resolve(song)
      })
    .then(song => {
      res.status(200).send(song);
    })
  })
})