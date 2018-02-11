"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
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
const accountSid = 'AC37d99d897e82e4af250ab4c524e947a4';
const authToken = '0e6998f048e470c89bd22525bf9f7026';
// require the Twilio module and create a ßREST client
const client = require('twilio')(accountSid, authToken);

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const menuRoutes = require("./routes/1menu");
const placeOrderRoutes = require("./routes/3placeOrder");

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));



// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/menu", menuRoutes(knex));
app.use("/api/placeOrder", placeOrderRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Order Page
app.get("/order", (req, res) => {
  res.render("order"); // render order page
});


// Order Page Post
app.post("/order", (req, res) => {
  res.render("order"); //
});


app.post("/test", (req, res) => {
  const orders = req.body;
  console.log(orders);
  // Set known menu items to quantity
  const item1 = orders['1'];
  const item2 = orders['2'];
  const item3 = orders['3'];
  const item4 = orders['4'];
  const item5 = orders['5'];
  let phone;
  let orderID;
  // Find set customer id
  knex('customer')
    .select("*")
    .from("customer")
    .where('id', 2)
  .then( (customer) => {
    phone = customer[0].phone;
    let customerid = customer[0].id;
    console.log(customer[0].id);
    return new Promise ( (resolve, reject) => {
      if (!customerid) {
        reject ();
      } else {
        // insert a new placeOrder id using customers id
        knex('placeOrder')
          .insert({customer_id: customerid, status: "un_confirmed"})
          .returning('id')
          .then( (placeOrderID) => {
            // console.log(placeOrderID[0]);
            resolve(placeOrderID[0]);
          })
      }
    })
  })
  .then ( (placeOrderID) => {
    console.log(placeOrderID);
    knex('orderList')
      .insert([{placeOrder_id: placeOrderID, menu_id: 1, quantity: item1},
        {placeOrder_id: placeOrderID, menu_id: 2, quantity: item2},
        {placeOrder_id: placeOrderID, menu_id: 3, quantity: item3},
        {placeOrder_id: placeOrderID, menu_id: 4, quantity: item4},
        {placeOrder_id: placeOrderID, menu_id: 5, quantity: item5}
        ])
    return placeOrderID
  })
  .then ( (placeOrder_id) => {
    console.log('end', placeOrder_id);
    orderID = placeOrder_id;
    client.messages
      .create({
         to: '+14163015829',
         from: '+16479332589',
         body: `OrderId: ${placeOrder_id} PhoneNumber: ${phone}
          Fries: ${item1} Burger: ${item2} Pizza: ${item3} MilkShake: ${item4} Soda: ${item5}`,
       })
       .then(message => console.log(message.sid))
       // redirect to a confimation page
       .then( () => res.redirect(`/test/${orderID}`));
  });
});

// Confirm page
app.get("/test/:id", (req, res) => {
  res.render("confirm"); // render confirm page
});

// Query db based order id
app.get("/query/:id", (req, res) => {
  const uid = req.params.id;
  console.log('heeeeeeeeyyyyyyyyyyyyy', uid);
    knex
      .select('*')
      .from('placeOrder')
      .where('id', uid)
      .then((results) => {
        res.json(results);
    });
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
