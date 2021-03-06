const Promise = require('bluebird');
const AWS = require('aws-sdk');


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


pollQueue = () => {
  console.log("Starting long poll operation");

  receiveMessage({
    WaitTimeSeconds: 20,
    VisibilityTimeout: 20
  })
  .then( (data) => {
    // make a post call to db to put new data in db
    // do some socket.io call that will send the message to react component
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
};
pollQueue();


