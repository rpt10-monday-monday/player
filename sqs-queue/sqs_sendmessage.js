const creds = require('./sqsConfig');

var Producer = require('sqs-producer');

var producer = Producer.create({
  queueUrl: 'https://sqs.us-east-2.amazonaws.com/021058984666/song-queue',
  region: 'us-east-2',
  accessKeyId: creds.AWS_ACCESS_KEY_ID,
  secretAccessKey: creds.AWS_SECRET_ACCESS_KEY
});

producer.send([{
  id: 'id1',
  body: 'Hello world'
}], function(err) {
  if (err) console.log(err);
});
