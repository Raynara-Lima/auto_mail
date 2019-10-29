const express = require('express');
const router = express.Router();
var cors = require('cors')
var fs = require('fs')
const app = express();
const port = process.env.PORT || 8080;

const bodyParser = require("body-parser");

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

const {PubSub} = require('@google-cloud/pubsub');

// Creates a client
const pubsub = new PubSub();


app.listen(port, () => console.log(`Listening on port ${port}`));


router.get('/getData' , (req, res) => {
  const subscriptionName = 'Web_App';
 const timeout = 60;

// References an existing subscription
const subscription = pubsub.subscription(subscriptionName);

// Create an event handler to handle messages
let messageCount = 0;
let msg = ''
const messageHandler = message => {
  console.log(`Received message ${message.id}:`);
  console.log(`\tData: ${message.data}`);
  console.log(`\tAttributes: ${message.attributes}`);
  messageCount += 1;
msg = JSON.parse(message.data)
    let txt = JSON.stringify(msg)
fs.writeFile('./banco.txt', txt, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
console.log( `${message.data}`)
  // "Ack" (acknowledge receipt of) the message

  message.ack();
  let data = msg
    return res.json({ success: true, data: data });
};

//Listen for new messages until timeout is hit

subscription.on(`message`, messageHandler);
if(messageCount === 0){

    return res.json({ success: true, data: 'teste' });

}
setTimeout(() => {
  subscription.removeListener('message', messageHandler);
  console.log(`${messageCount} message(s) received.`);
}, timeout * 1000);

  res.setHeader('Access-Control-Allow-Origin', '*');  


});

router.post('/setData' , (req, res) => {
const topicName = 'teste';
console.log(req.query[0])

let teste = JSON.parse(req.query[0])

 const data = JSON.stringify({ foo: teste.msg });

// Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
const dataBuffer = Buffer.from(data);



publishMessage(topicName, dataBuffer)

  res.setHeader('Access-Control-Allow-Origin', '*');  
    return res.json({ success: true});
})
async function publishMessage(topicName, dataBuffer){
  const messageId = await pubsub.topic(topicName).publish(dataBuffer);
  console.log(`Message ${messageId} published.`);
  }
app.use('/api', router);
app.use(cors())




