// const AWS = require('aws-sdk');

// AWS.config.update({region: 'us-east-2'})

// var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

// var queueURL = "https://sqs.us-east-2.amazonaws.com/021058984666/song-queue";

// var params = {
//  AttributeNames: [
//     "SentTimestamp"
//  ],
//  MaxNumberOfMessages: 1,
//  MessageAttributeNames: [
//     "All"
//  ],
//  QueueUrl: queueURL,
//  VisibilityTimeout: 20,
//  WaitTimeSeconds: 0
// };

// sqs.receiveMessage(params, function(err, data) {
//   if (err) {
//     console.log("Receive Error", err);
//   } else if (data.Messages) {
//     var deleteParams = {
//       QueueUrl: queueURL,
//       ReceiptHandle: data.Messages[0].ReceiptHandle
//     };
//     console.log(data.Messages);
//     sqs.deleteMessage(deleteParams, function(err, data) {
//       if (err) {
//         console.log("Delete Error", err);
//       } else {
//         console.log("Message Deleted", data);
//       }
//     });
//   }
// });

const Consumer = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-east-2.amazonaws.com/021058984666/song-queue',
  handleMessage: async (message) => {
    console.log(message);
  }
});

app.on('error', (err) => {
  console.error(err.message);
});

app.on('processing_error', (err) => {
  console.error(err.message);
});

app.start();