// const db = require('./index.js');
// const Song = require('./Song.js');
// const faker = require('faker');

// const createSongs = () => {
//   let songList = [];
//   for (let i = 0; i < 100; i++) {
//     let song = {
//       songID: i,
//       title: faker.random.words(),
//       artist: faker.name.findName(),
//       songURL: faker.image.imageUrl(),
//       imageURL: faker.image.imageUrl()
//     };
//     songList.push(song);
//   }
//   return songList;
// }

// const seedDB = () => {
//   Song.create(createSongs())
//   .then(() => db.close());
// }
// seedDB();