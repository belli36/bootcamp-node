const express = require('express');
const jwt = require("jsonwebtoken")
// const { connection } = require('mongoose');
const productsRouter = require('./Routers/productsRouter')
const userRouter = require('./Routers/userRouter')
// require("dotenv").config()
const passport = require("passport");
// require("./config/passportConfig")(passport);
// const express = require('express')
const router = express.Router();
// const productBL = require('../BL/userGooglesBL');
// const auth = require('../middleware/auth.middleware');
// Redirect the user to the Google signin page 
// app.get(
//     "/auth/google",
//     passport.authenticate("google", { scope: ["email", "profile"] })
// );
//    Retrieve user data using the access token received 
// app.get(
//     "/auth/google/callback",
//     passport.authenticate(quot, google, quot, { session: false }),
//     (req, res) => {
//         res.redirect("/profile/");
//     }
// );
{/* <em>// profile route after successful sign inem</em> */}
// app.get("/profile", (req, res) => {
//     console.log(req);
//     res.send("Welcome");
// });
// app.get(
//     "/auth/google/callback",
//     passport.authenticate(/*quot, google, quot,*/"google" /*{ session: false }*/),
//     (req, res) => {
//         jwt.sign(
//             { user: req.user },
//             "secretKey",
//             { expiresIn: "1h" },
//             (err, token) => {
//                 if (err) {
//                     return res.json({
//                         token: null,
//                     });
//                 }
//                 res.json({
//                     token,
//                 });
//             }
//         );
//     }
// );
const connection = require('./config/DB');
//שליחת מייל
// let transporter = nodemailer.createTransport(transport[ defaults])
// transporter.sendMail(data[ callback])
// const nodemailer = require("nodemailer");

// // async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

// main().catch(console.error);
//סוף שליחת מייל
let app = express();

app.use(express.json())
connection();
const cors = require('cors');
// app.use(cors());
app.use(cors({ origin: 'http://localhost:3000' }))
app.use('/api/products', productsRouter)
app.use('/api/user', userRouter)

app.listen(8000)
