# Zebra Restaurant App

Welcome to our food pick up ordering app. Once the user selects his/her items from the menu, the restaurant receives an sms message (Twilio) with the order. The restaurant then sends a text to the user with the time the order will be ready for pickup as well as updating the website.


## Screenshots





## Getting Started

Please visit https://www.twilio.com
1. Sign up and follow the quick start instructions
https://www.twilio.com/docs/quickstart/node/programmable-sms
2. The to number will be your number the from will be the number purchased on Twilio in the server.js file and the respond_sms.js file.
3. Replace the accountSid and authToken from your account.
4. Then run ./ngrok http 1337
5. On a seperate terminal run the respond_sms.js file
6. Then place an order on our site. loacalhost:8080/zebra
7. You should receive that order via text to your number.
8. "As the restaurant" respond with "Order#65 will take 30 minutes"
9. You will receive a confirmation text back and that message will be forwarded to you "as the customer"


## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
- Body-parser 1.15.2
- Express 4.13.5
- Ngrok 
- Knex 0.11.7
- Node-sass-middleware
- PG - 6.0.2
- Twilio 3.11.2
