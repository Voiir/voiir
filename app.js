const express = require("express");
const logger = require("morgan");
const admin = require("firebase-admin");
const app = express();

var serviceAccount = require("./voiir-a23cb-firebase-adminsdk-8x041-38fcd8f12d.json");
const { json } = require("express");

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





app.post("/api/setUser", (req, res) => {
  const emailId = req.body.emailId;
  const username = req.body.username;
  const name = req.body.name;
  const dpUrl = req.body.dpUrl;
  const city = req.body.city;
  const state = req.body.state;
  const profession = req.body.profession;


  let usersRef = firedb.collection("UserAuth").doc(emailId);
  usersRef.get().then((docSnapshot) => {
    if (!docSnapshot.exists) {
      (async () => {
        try {
          await firedb.collection("UserAuth").doc(emailId).create({
            createdAt: new Date(),
            username: username,
          });
          await firedb
            .collection("UserCollection")
            .doc(username)
            .create({
              name: name,
              dpUrl: dpUrl,
              city: city,
              state: state,
              profession: profession,
              connectedPlatform: ["gmail"],
            });
          await firedb
            .collection("UserDataCollection")
            .doc(username)
            .create({
              accounts: { gmail: emailId },
              bookmarks: [],
            });
          console.log("After await");
          return res.status(201).send();
        } catch (error) {
          console.log(error);
          return res.status(500).send();
        }
      })();
    } else {
      return res.status(409).send();
    }
  });
});

app.get("/api/userExists", (req, res) => {
  const emailId = req.body.emailId;

  (async () => {
    try {
      let usersRef = await firedb.collection("UserAuth").doc(emailId);
      usersRef.get().then((docSnapshot) => {
        if (docSnapshot.exists) {
           return res.status(403).send(true);
        } else {
          return res.status(404).send(false);
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

module.exports = app;
