const db = require('./index.js');
const Song = require('./Song.js');
const faker = require('faker');

const createSongs = () => {
  let songList = [];
  for (let i = 0; i < 100; i++) {
    let song = {
      title: faker.random.words(),
      artist: faker.name.findName(),
      length: Math.floor(Math.random() * (480 - 180) + 180),
      album: faker.random.words(),
      order: Math.floor(Math.random() * (14 - 5) + 5),
      imageURL: faker.image.imageUrl()
    };
    songList.push(song);
  }
  return songList;
}

const seedDB = () => {
  Song.create(createSongs())
  .then(() => db.close());
}
seedDB();