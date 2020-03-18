// eslint-disable-next-line no-unused-vars
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const { htmlToText } = require('nodemailer-html-to-text');
const { email, password } = require('./config');

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: email,
    pass: password
  }
});

mailTransport.use('compile', htmlToText());

const APP_NAME = 'Sliceline';

function sendOrderEmail(order) {
  const mailOptions = {
    from: `${APP_NAME} <noreply@sliceline.com`,
    to: order.email,
    subject: `Your order from ${APP_NAME}.`,
    html: `
      <table style="width:500px; margin: auto">
        <tr>
          <th>${order.displayName}</th>
          <th>You ordered some food, here's confirmation of that order.</th>
        </tr>
        ${order
          .map(
            ({ name, quantity, price }) => `
          <tr>
            <td>${quantity}</td>
            <td>${name}</td>
            <td>${price}</td>
          </tr>
        `
          )
          .join('')}
        <strong>
          Hello
        </strong>
        World
      </table>
    `
  };
  mailTransport.sendMail(mailOptions);
}

exports.sendUserEmail = functions.database
  .ref('/orders/{pushId}')
  .onCreate(order => {
    console.log('Sending User Email... ');
    sendOrderEmail(order.val());
  });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
