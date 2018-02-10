"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 1337;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

//Twilio Setupß
const twilioAccount = require("./send_sms.js");
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

const accountSid = 'AC84a760b7d1f0d10785b2329131cc8cc9';
const authToken = '88c07a20c9cc2b2434fe293281f0a852';
const client = require('twilio')(accountSid, authToken);

const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;



app.use(bodyParser());

function getIdETA(string){
    var number = string.match(/^\d+|\d+\b|\d+(?=\w)/g);
    return number
}

app.post('/sms', (req, res) => {
  const twiml = new MessagingResponse();
  // console.log('body.Body', req.body.Body);
  const message = req.body.Body;
  console.log('message', message);
  const nums = getIdETA(message);
  console.log('nums', nums);
  const id = nums[0];
  console.log('id', id);
  const ETA = nums[1];
  console.log('eta', ETA);

  knex('placeOrder')
    .select("*")
    .from('placeOrder')
    .where('id', id)
    .update({status: 'confirmed', eta: ETA})
  .then( (order) => {
    console.log(order)
  })

// client.messages
//  .create({
//    to: '+16477741151',
//    from: '+16479313771',
//    body: req.body.Body
//  })
//  .then(message => console.log(message.sid));

//  twiml.message('Thanks! We will tell the customer');

//  res.writeHead(200, {'Content-Type': 'text/xml'});
//  res.end(twiml.toString());
});





http.createServer(app).listen(1337, () => {
 console.log('Express server listening on port 1337');
});
