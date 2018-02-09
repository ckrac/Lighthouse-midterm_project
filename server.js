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

//Twilio Setup
const twilioAccount = require("./send_sms.js");
const accountSid = 'AC84a760b7d1f0d10785b2329131cc8cc9';
const authToken = '88c07a20c9cc2b2434fe293281f0a852';
// require the Twilio module and create a REST client
const client = require('twilio')(accountSid, authToken);

// client.messages
//  .create({
//    to: '+16477741151',
//    from: '+16479313771',
//    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
//  })
//  .then(message => console.log(message.sid));

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const menuRoutes = require("./routes/1menu");
// const customerRoutes = require("./routes/customer");
// const placeOrderRoutes = require("./routes/placeOrder");
// const orderListRoutes = require("./routes/orderList");

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
// app.use("/api/customer", customerRoutes(knex));
// app.use("/api/placeOrder", placeOrderRoutes(knex));
// app.use("/api/orderList", orderListRoutes(knex));

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
          .insert({customer_id: customerid})
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
    client.messages
      .create({
         to: '+16477741151',
         from: '+16479313771',
         body: `OrderId: ${placeOrder_id} PhoneNumber: ${phone}
          Fries: ${item1} Burger: ${item2} Pizza: ${item3} MilkShake: ${item4} Soda: ${item5}`,
       })
       .then(message => console.log(message.sid));
  });
});

// Confirm page
app.get("/test", (req, res) => {
  res.render("confirm"); // render confirm page
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
