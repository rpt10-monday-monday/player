const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost/songs');

module.exports = db;