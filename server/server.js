const express = require('express');
const router = express.Router();
var cors = require('cors')
var fs = require('fs')
const app = express();
const port = process.env.PORT || 8080;
var db = require("./db");
const bodyParser = require("body-parser");
const {PubSub} = require('@google-cloud/pubsub');
const pubsub = new PubSub();

app.use('/api', router);
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());


const socketIO = require('socket.io')
const http = require('http')

const server = http.createServer(app)
const io = socketIO(server)

io.on('connection', socket => {
  //console.log('aqui')
//this.getData()
socket.on('getData', (information) => {
  getData(function(data){
        io.sockets.emit('getData', json)
  })
})

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})


server.listen(port, () => console.log(`Listening on port ${port}`))


    function getData(){
      let json
      receberMensagensPubSub(function(data){

        if(data.qtdMensagens === 0){
          getJson(function(infoJson){
          json = infoJson
        })
        }else if(data.qtdMensagens === 1){
          json = data.json[0]
          salvarJson(json)
        }else{
          json = data.json[data.qtdMensagens - 1]
          salvarJson(json)
          }
      })
      return json
    }












router.get('/getDataSensores' , (req, res) => {
  var data
  res.setHeader('Access-Control-Allow-Origin', '*');  

  receberMensagensPubSub(function(data){
    if(data.qtdMensagens === 0){
        getJson(function(infoJson){
          json = infoJson
          json.instru.vg = ""
          console.log(json)
          return res.json({ success: true, data: infoJson });
        })
    }else if(data.qtdMensagens === 1){
      salvarJson(data.json[0])
      return res.json({ success: true, data: data.json[0] });
      }else{
        let json = data.json[data.qtdMensagens - 1]
        salvarJson(json)
      return res.json({ success: true, data: json});
      }

  })

});
router.get('/getData' , (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');  

  var data

  receberMensagensPubSub(function(data){
    if(data.qtdMensagens === 0){
        getJson(function(infoJson){
          json = infoJson
          console.log(json)
          return res.json({ success: true, data: infoJson });
        })
    }else if(data.qtdMensagens === 1){
      salvarJson(data.json[0])
      return res.json({ success: true, data: data.json[0] });
      }else{
        let json = data.json[data.qtdMensagens - 1]
        salvarJson(json)
      return res.json({ success: true, data: json});
      }

  })

});
      function receberMensagensPubSub (callback){


        const subscriptionName = 'Web_App';
          const timeout = 1;
          const subscription = pubsub.subscription(subscriptionName);
          let messageCount = 0;
          let json = []

          const messageHandler = message => {
            console.log(`Received message ${message.id}:`);
            console.log(`\tData: ${message.data}`);
            messageCount += 1;
            json.push(JSON.parse(message.data))
            message.ack(); 
          };
          subscription.on(`message`, messageHandler);

          setTimeout(() => {
              subscription.removeListener('message', messageHandler);
              console.log(`${messageCount} message(s) received.`);
              return callback({json: json, qtdMensagens:messageCount })
          }, timeout * 1000);
            
        

          }

      salvarJson = (json) =>{
        var Informacoes = db.Mongoose.model('infoMailCar', db.InfoSchema, 'infoMailCar');
        var info = new Informacoes(json);

        info.save(function (err) {
            if (err) {
                console.log("Error! " + err.message);
                return err;
              }
            else {
                console.log("Post saved");
              }
            });
          }

        function getJson(callback){
            var InfoJson = db.Mongoose.model('infoMailCar', db.InfoSchema, 'infoMailCar');
            InfoJson.findOne().lean().exec(
               function (e, docs) {
                return callback(docs)
            });
          }


router.post('/setData' , (req, res) => {
  const topicName = 'Car_input';
  console.log(req.query[0])
  let json = JSON.parse(req.query[0])
  const data = JSON.stringify( json);

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



