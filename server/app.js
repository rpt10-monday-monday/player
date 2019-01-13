// const express = require('express');
// const app = express();
// const http = require('http');
// const io = require('socket.io').listen(server);
// const server = http.createServer(app);

const express = require('express'),
      app = require('express')(),
      http = require('http').Server(app),
      io = require('socket.io')(http)

const morgan = require('morgan');
const path = require('path');
// const port = process.env.PORT || 3002;
const bodyParser = require('body-parser');
const Promise = require('bluebird');
const AWS = require('aws-sdk');

const Songs = require('../mongoDB/Song.js')

const server = app.listen(3002, () => {
  let host = server.address().address;
  let port = server.address().port;
})

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// server.listen((port), () => {
//   console.log(`server is listening on PORT: ${port}`);
// });


var sqs = new AWS.SQS({
    apiVersion: '2012-11-05',
    region: 'us-east-2',
    params: {
      AttributeNames: [
        "SentTimestamp"
    ],
      MaxNumberOfMessages: 1,
      MessageAttributeNames: [
        "All"
    ],
      QueueUrl: "https://sqs.us-east-2.amazonaws.com/021058984666/song-queue"
    }
  }
);

let receiveMessage = Promise.promisify(sqs.receiveMessage, {context: sqs});
let deleteMessage = Promise.promisify(sqs.deleteMessage, {context: sqs});





(pollQueue = () => {
  console.log("Starting long poll operation");

  receiveMessage({
    WaitTimeSeconds: 20,
    VisibilityTimeout: 20
  })
  .then( (data) => {
    console.log("Message", data.Messages);
    // make a post call to db to put new data in db
    // do some socket.io call that will send the message to react component
    if(data.Messages !== undefined) {
      io.on('connection', s => {
        console.log('made it into io.on')
        console.error('sockiet.io connection error');
        for (var t = 0; t < 3; t++) {
          console.log('inside io server', data.Messages);
          setTimeout(() => s.emit('message', data.Messages), 1000*t);
        }
      })
    }
    if(!data.Messages) {
      throw(
        new Error("There are no messages in the queue")
      )
    }
    return(
      deleteMessage({
        ReceiptHandle: data.Messages[0].ReceiptHandle
      })
    )
  })
  .then( (data) => {
    console.log("Message deleted!");
  })
  .catch(
    (err) => {
      console.log(err.message);
    }
  )
  .finally(pollQueue);
})();










// io.on('connection', (client) => {
//   // console.log(client);

//   client.on('disconnect', (id) => {
//     console.log(`user with ID ${id} has disconnected`);
//   });
// });
// io.emit('test string');

// app.listen(port, () => {
//   console.log(`server running at: http://localhost:${port}`);
// });

// app.get('/song', (req, res) => {
//   Songs.find({ songID: 5 })
//     .then((song) => {
//       return new Promise((resolve, reject) => {
//         resolve(song)
//       })
//     .then(song => {
//       res.status(200).send(song);
//     })
//   })
// })


