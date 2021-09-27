const express = require("express");
const logger = require("morgan");
const admin = require("firebase-admin");
const middlew = require("express-firebase-middleware");
const app = express();
const profileURL = require('./profileURL');
require("dotenv").config();

const { json } = require("express");

var firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert({
    type: process.env.type,
    project_id: process.env.project_id,
    private_key_id: process.env.project_key_id,
    private_key: process.env.private_key.replace(/\\n/g, '\n'),
    client_email: process.env.client_email,
    client_id: process.env.client_id,
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
  }),
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

app.use("/api/userExists", middlew.auth);
app.use("/api/setUser", middlew.auth);
app.use("/api/userSearch", middlew.auth);
app.use("/api/user/:username", middlew.auth);
app.use("/api/updateAccount", middlew.auth);

app.get("/", (req, res) => {
  res.send("Server is Up!!!!");
});

app.post("/api/setUser", (req, res) => {
  var idToken = req.header("Authorization");
  if (idToken == undefined) {
    console.log("no header received");
    return null;
  }

  idToken = idToken.substr(7, idToken.length);

  firebaseAdmin.auth().verifyIdToken(idToken).then((decodedToken) => {
    let uid = decodedToken.uid;

    firebaseAdmin.auth().getUser(uid).then((userRecord) => {
      var name = userRecord.displayName;
      var dpUrl = userRecord.photoURL;
      var emailId = userRecord.email;
      var username = req.body.username;
      var city = req.body.city;
      var state = req.body.state;
      var profession = req.body.profession;

      let usersRef = firedb.collection("UserAuth").doc(emailId);
      usersRef.get().then((docSnapshot) => {
        if (!docSnapshot.exists) {
          (async () => {
            try {
              await firedb.collection("UserAuth").doc(emailId).create({
                createdAt: new Date(),
                username: username,
              });
              await firedb.collection("UserCollection").doc(username).create({
                name: name,
                dpUrl: dpUrl,
                city: city,
                state: state,
                profession: profession,
                connectedPlatform: ["gmail"],
              });
              await firedb.collection("UserDataCollection").doc(username).create({
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
  });
});

app.post("/api/userExists", (req, res) => {
  let authToken = req.header("Authorization");
  if (authToken == undefined) {
    console.log("Header is not received.");
    return null;
  }
  authToken = authToken.substr(7, authToken.length);

  firebaseAdmin.auth().verifyIdToken(authToken).then((decodedToken) => {
    var returnStatusCode;
    var returnResponse;
    var returnMessage;
    var returnType = "bool";
    const emailId = String(decodedToken.email);
    (async () => {
      try {
        let usersRef = await firedb.collection("UserAuth").doc(emailId);
        usersRef.get().then((docSnapshot) => {
          if (docSnapshot.exists) {
            returnStatusCode = 403;
            returnMessage = "User Already Exists";
            returnResponse = true;
          } else {
            returnStatusCode = 402;
            returnMessage = "User Does not Exists";
            returnResponse = false;
          }
          return res.status(returnStatusCode).json({
            message: returnMessage,
            response: returnResponse,
            type: returnType,
          });
        });
      } catch (error) {
        console.log(error);
        returnStatusCode = 500;
        returnMessage = error;
        returnResponse = NULL;
        return res.status(returnStatusCode).json({
          message: returnMessage,
          response: returnResponse,
          type: returnType,
        });
      }
    })();
  });
});

app.post("/api/userSearch", (req, res) => {
  const name = req.body.name;

  (async () => {
    var returnStatusCode;
    var returnResponse;
    var returnMessage;
    var returnType = "array";
    try {
      let usersRef = await firedb.collection("UserCollection");
      let response = [];

      await usersRef.get().then((querySnapshot) => {
        let docs = querySnapshot.docs;

        for (let doc of docs) {
          let nameOfUser = doc.data().name.toLowerCase();
          let result = nameOfUser.startsWith(name.toLowerCase());
          if (result) {
            const selectedUser = doc.data();
            response.push(selectedUser);
          }
        }
        if (response.length >= 1) {
          returnMessage = "User's found";
          returnStatusCode = 200;
        }
        else {
          returnMessage = "No User's found";
          returnStatusCode = 404;
        }
        return res.status(returnStatusCode).json({
          message: returnMessage,
          response: response,
          type: returnType,
        })
      });

    } catch (error) {
      console.log(error);
      returnStatusCode = 500;
      returnMessage = error;
      returnResponse = NULL;
      return res.status(returnStatusCode).json({
        message: returnMessage,
        response: response,
        type: returnType,
      })
    }
  })();
});

app.get("/api/user/:username", (req, res) => {
  const username = req.params.username;
  (async () => {
    var returnStatusCode;
    var returnResponse;
    var returnMessage;
    var returnType = "object";
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
          returnMessage = "User found";
          returnStatusCode = 200;
          returnResponse = response;
        } else {
          returnMessage = "No User found";
          returnStatusCode = 404;
          returnResponse = null;
        }
        return res.status(returnStatusCode).json({
          message: returnMessage,
          response: returnResponse,
          type: returnType,
        });
      });
    } catch (error) {
      console.log(error);
      returnMessage = error;
      returnStatusCode = 500;
      return res.status(returnStatusCode).json({
        message: returnMessage,
        response: null,
        type: returnType,
      });
    }
  })();
});

app.post("/api/updateAccount", (req, res) => {
  var idToken = req.header("Authorization");
  if (idToken == undefined) {
    console.log("no header received");
    return null;
  }

  idToken = idToken.substr(7, idToken.length);
  firebaseAdmin.auth().verifyIdToken(idToken).then((decodedToken) => {
    let uid = decodedToken.uid;
    firebaseAdmin.auth().getUser(uid).then((userRecord) => {
      var emailId = userRecord.email;
      firedb.collection("UserAuth").doc(emailId).get().then((docSnapshot) => {
        var returnStatusCode;
        var returnResponse = null;
        var returnMessage;
        var returnType = null;
        if (docSnapshot.exists) {
          var username = docSnapshot.data().username;
          var platform = req.body.platform;
          var platformUsername = req.body.platformUsername;
          var url = profileURL(platform, platformUsername);
          (async () => {
            try {
              const userDoc = firedb.collection("UserCollection").doc(username);
              let arrayUnion = userDoc.update({
                connectedPlatform: admin.firestore.FieldValue.arrayUnion(platform),
              });
              firedb.collection("UserDataCollection").doc(username).set(
                {
                  accounts: { [`${platform}`]: url },
                },
                { merge: true }
              )
                .then(() => {
                  returnMessage = "User Profile Updated";
                  returnStatusCode = 200;
                  return res.status(returnStatusCode).json({
                    message: returnMessage,
                    response: returnResponse,
                    type: returnType,
                  });
                });
            } catch (error) {
              returnMessage = error;
              returnStatusCode = 500;
              return res.status(returnStatusCode).json({
                message: returnMessage,
                response: returnResponse,
                type: returnType,
              });
            }
          })();
        }
        else {
          returnMessage = "User Not found";
          returnStatusCode = 404;
          return res.status(returnStatusCode).json({
            message: returnMessage,
            response: returnResponse,
            type: returnType,
          });
        }
      });
    });
  });
});

app.post("/api/userBookmark", (req, res) => {
  const usernameAdd = req.body.usernameAdd;
  let usernameHost;
  let authToken = req.header("Authorization");
  if (authToken == undefined) {
    console.log("Header is not received.");
    return null;
  }
  authToken = authToken.substring(7, authToken.length);
  var returnMessage;
  var returnStatusCode;
  var returnResponse = null;
  var returnType = null;
  firebaseAdmin.auth().verifyIdToken(authToken).then((decodedToken) => {
    let host = String(decodedToken.email);
    (async () => {
      const userDocUsername = await firedb.collection("UserAuth").doc(host);
      usernameHost = (await userDocUsername.get()).data().username;
      try {
        const userDocAdd = await firedb.collection("UserDataCollection").doc(usernameHost);
        if ((await userDocAdd.get()).data().bookmarks.indexOf(usernameAdd) == -1) {
          let arrayUnion = userDocAdd.update({
            bookmarks: admin.firestore.FieldValue.arrayUnion(usernameAdd),
          });
          returnMessage = "Profile Bookmarked";
          returnStatusCode = 200;
        } else {
          let arrayUnion = userDocAdd.update({
            bookmarks: admin.firestore.FieldValue.arrayRemove(usernameAdd),
          });
          returnMessage = "Profile Bookmark Removed";
          returnStatusCode = 200;
        }
        return res.status(returnStatusCode).json({
          message: returnMessage,
          response: returnResponse,
          type: returnType,
        });
      } catch (error) {
        returnMessage = error;
        returnStatusCode = 500;
        return res.status(returnStatusCode).json({
          message: returnMessage,
          response: returnResponse,
          type: returnType,
        });
      }
    })();
  });
});

app.post("/api/usernameExist", (req, res) => {
  const requestedUsername = req.body.requestedUsername;
  var returnMessage;
  var returnStatusCode;
  var returnResponse = null;
  var returnType = null;
  (async () => {
    try {
      firedb.collection("UserCollection").doc(requestedUsername).get().then((docSnapshot) => {
        if (docSnapshot.exists) {
          returnStatusCode = 409;
          returnMessage = "Username Already Exists";
        } else {
          returnStatusCode = 200;
          returnMessage = "Username Available";
        }
        return res.status(returnStatusCode).json({
          message: returnMessage,
          response: returnResponse,
          type: returnType
        });
      });
    } catch (error) {
      returnMessage = error;
      returnStatusCode = 500;
      return res.status(returnStatusCode).json({
        message: returnMessage,
        response: returnResponse,
        type: returnType
      });
    }
  })();
});

module.exports = app;
