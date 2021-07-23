const express = require("express");
const logger = require("morgan");
const admin = require("firebase-admin");
const middlew = require("express-firebase-middleware");
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

app.use('/api/setUser',middlew.auth);
app.use('/api/userExists',middlew.auth);

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
          return res.status(201).send("User Created");
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

app.get("/api/userSearch", (req, res) => {
  const name = req.body.name;

  (async () => {
    try {
      let usersRef = await firedb.collection("UserCollection");
      let response = [];

      await usersRef.get().then((querySnapshot) => {
        let docs = querySnapshot.docs;

        for (let doc of docs) {
          let nameOfUser = doc.data().name.toLowerCase();
          let result = nameOfUser.startsWith(name.toLowerCase());
          if (result) {
            console.log(nameOfUser);
            const selectedUser = doc.data();
            response.push(selecconnectedPlatformtedUser);
          }
        }
        return response;
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.send(500).send(error);
    }
  })();
});

app.get("/api/user/:username", (req, res) => {
  const username = req.params.username;
  (async () => {
    try {
      const userRef = await firedb.collection("UserCollection").doc(username);
      userRef.get().then(async (docSnapshot) => {
        if (docSnapshot.exists) {
          const userData = await firedb
            .collection("UserDataCollection")
            .doc(username)
            .get();
          const response = {
            userCollection: docSnapshot.data(),
            userData: userData.data(),
          };
          return res.status(200).send(response);
        } else {
          console.log("User Not found");
          return res.status(404).send("User Not Found");
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.post("/api/updateAccount", (req, res) => {
  const platform = req.body.platform;
  const url = req.body.url;
  const username = req.body.username;

  (async () => {
    try {
      const userDoc = await firedb.collection("UserCollection").doc(username);
      let arrayUnion = userDoc.update({
        connectedPlatform: admin.firestore.FieldValue.arrayUnion(platform),
      });

      await firedb
        .collection("UserDataCollection")
        .doc(username)
        .set(
          {
            accounts: { [`${platform}`]: url },
          },
          { merge: true }
        );
      return res.status(200).send("User Updated");
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.post("/api/userBookmark", (req, res) => {
  const usernameAdd = req.body.usernameAdd;
  const usernameHost = req.body.usernameHost;

  (async () => {
    try {
      const userDoc = await firedb
        .collection("UserDataCollection")
        .doc(usernameHost);

      if ((await userDoc.get()).data().bookmarks.indexOf(usernameAdd) == -1) {
        let arrayUnion = userDoc.update({
          bookmarks: admin.firestore.FieldValue.arrayUnion(usernameAdd),
        });
        return res.status(200).send("Profile Bookmarked");
      } else {
        let arrayUnion = userDoc.update({
          bookmarks: admin.firestore.FieldValue.arrayRemove(usernameAdd),
        });
        return res.status(200).send("Profile Bookmark Removed");
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

app.get("/api/usernameExist", (req, res) => {
  const requestedUsername = req.body.requestedUsername;
  (async () => {
    try {
      firedb
        .collection("UserCollection")
        .doc(requestedUsername)
        .get()
        .then((docSnapshot) => {
          if (docSnapshot.exists) {
            return res.status(409).send("Username Exists");
          } else {
            return res.status(200).send("Username Available");
          }
        });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  })();
});

module.exports = app;
