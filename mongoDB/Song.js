const mongoose = require('mongoose');
const db = require('./index.js');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const songSchema = new Schema({
  songID: Number,
  title: String,
  artist: String,
  songURL: String,
  imageURL: String
},
  {
    timestamps: true
  }
);

const Song = mongoose.model('Song', songSchema);
module.exports = Song;
