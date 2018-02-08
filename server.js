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

// // Order Page
// app.get("/order", (req, res) => {
//   res.render("order"); // render order page
// });


// // Order Page Post
// app.post("/order", (req, res) => {
//   res.render("order"); //
// });

// // Confirm Order Page
// app.get("/order/confirm", (req, res) => {
//   res.render("confirm"); // render comirm page
// });

//Order Page
app.get("/order", (req, res) => {
  res.render("order/index");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
