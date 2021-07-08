const express = require("express");
const logger = require("morgan");
const admin = require("firebase-admin");
const app = express();

var serviceAccount = require("./voiir-a23cb-firebase-adminsdk-8x041-38fcd8f12d.json");

var firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var firedb = firebaseAdmin.firestore();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
  if ("OPTIONS" === req.method) {
    res.sendStatus(200);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
});

app.use(express.json());

console.log('before api');

app.get('/',(req,res)=>{
    res.send('Hello');
})

app.post('/apis/signIn', (req, res) => {
    console.log('entered api');
  const emailId = req.body.emailId;
//   const createdAt = Date.now;

  let usersRef = firedb.collection("UserAuth").doc(emailId);
  usersRef.get().then((docSnapshot) => {
    if (!docSnapshot.exists) {
      (async () => {
        try {
            console.log('before await');
          await firedb.collection("UserAuth").doc(emailId).create({
            createdAt: new Date()
          });
          console.log('After await');
          return res.status(201).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send();
        }
      })();
    }
    else{
         return res.status(409).send();
    }
  });
});

module.exports = app;