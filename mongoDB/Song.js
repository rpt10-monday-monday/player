const mongoose = require('mongoose');
const db = require('./index.js');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

const songSchema = new Schema({
  title: String,
  artist: String,
  length: Number,
  album: String,
  order: Number,
  imageURL: String,
},
  {
    timestamps: true
  }
);

const Song = mongoose.model('Song', songSchema);
module.exports = Song;
