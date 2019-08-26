var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var User = require("./DataAccessLayer/UserDAL");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");
var auth = require("./auth-guard");
var Constants = require("./Constants");
const redis = require("redis");
const client = redis.createClient(6379);
//const db = require("./config/db");
const mongoose = require("mongoose");
const questionRoutes = require("./api/routes/question");
const userRoutes = require("./api/routes/users");
const feedRoutes = require("./api/routes/feed");
const answerRoutes = require("./api/routes/answer");
const topicRoutes = require("./api/routes/topic");
const chatRoutes = require("./api/routes/chat");

app.use(bodyParser.json());
var kafka = require("./kafka/client");

app.use(cors({ origin: Constants.clientUrl, credentials: true }));

// try {
//   db.connect();
//   console.log("connected");
// } catch (e) {
//   console.log(e);
// }

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", Constants.clientUrl);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

const getjwt = (email, id, username, password, password2, extra, callback) => {
  let hash1 = crypto.createHash("sha512");
  let hash2 = crypto.createHash("sha512");
  hash1.update(password);
  hash2.update(hash1.digest("hex") + extra);
  const encrypted = hash2.digest("hex");
  if (encrypted === password2) {
    hash1 = undefined;
    hash2 = undefined;
    var token = jwt.sign(
      { email: email, user: id, username: username },
      Constants.jwtSecret,
      { expiresIn: 60 * 60, issuer: "quora" }
    );
    callback({ token: token });
  } else {
    callback({ login: false });
  }
};

app.post("/login", (req, res) => {
  if (req.body.username === undefined || req.body.password === undefined) {
    console.log(req.body);
    res.send({ error: "Please Enter Details" });
  } else {
    client.get("ID:" + req.body.username, (error, result) => {
      if (result) {
        console.log("Inredis\n");
        console.log(result);
        const resultJSON = JSON.parse(result);
        getjwt(
          resultJSON.email,
          resultJSON.userid,
          resultJSON.userName,
          req.body.password,
          resultJSON.password,
          resultJSON.extra,
          resp => {
            console.log(resp);
            res.send(resp);
          }
        );
      } else {
        User.getLogin(req.body.username, (err, op) => {
          if (err !== null) {
            res.send({ error: err });
          } else {
            getjwt(
              op[0].email,
              op[0].ID,
              req.body.username,
              req.body.password,
              op[0].password,
              op[0].extra,
              resp => {
                client.setex(
                  "ID:" + req.body.username,
                  3600,
                  JSON.stringify({
                    source: "Redis Cache",
                    email: op[0].email,
                    userid: op[0].ID,
                    password: op[0].password,
                    extra: op[0].extra
                  }),
                  (er, reply) => {
                    res.send(resp);
                  }
                );
              }
            );
          }
        });
      }
    });
    // User.getLogin(req.body.username, (err, op) => {
    //     let hash1 = crypto.createHash('sha512');
    //     let hash2 = crypto.createHash('sha512');
    //     if(err !== null) { res.send({error: err}) }
    //     else{
    //         hash1.update(req.body.password);
    //         hash2.update(hash1.digest('hex') + op[0].extra);
    //         const encrypted = hash2.digest('hex');
    //         if(encrypted === op[0].password){
    //             hash1 = undefined;
    //             hash2 = undefined;
    //             var token = jwt.sign({email:op[0].email, user: op[0].ID, username: req.body.username},Constants.jwtSecret,{expiresIn: 60*60, issuer: 'quora'});
    //             res.send({token: token});
    //         } else {
    //             res.send({login: false});
    //         }
    //     }
    // });
  }
});

app.post("/signup", (req, res) => {
  User.checkExistingAccount(req.body.email, req.body.userName, (err, op) => {
    if (err !== null) {
      res.send({ error: err });
    } else {
      console.log(op);
      if (op.length === 0) {
        let extra = "";
        var possible =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 10; i++)
          extra += possible.charAt(Math.floor(Math.random() * possible.length));

        let hash1 = crypto.createHash("sha512");
        let hash2 = crypto.createHash("sha512");
        hash1.update(req.body.password);
        hash2.update(hash1.digest("hex") + extra);
        User.SignUp(
          {
            password: hash2.digest("hex"),
            extra: extra,
            email: req.body.email,
            username: req.body.userName
          },
          (error, resp) => {
            if (error !== null) {
              res.send({ error: error });
            } else {
              kafka.make_request(
                "signup",
                {
                  userid: resp.insertId,
                  firstName: req.body.firstName,
                  middleName: req.body.middleName,
                  familyName: req.body.familyName,
                  userName: req.body.userName,
                  email: req.body.email,
                  city: req.body.city,
                  state: req.body.state,
                  zip: req.body.zip,
                  profile: req.body.profile,
                  education: req.body.education,
                  career: req.body.career,
                  bio: req.body.bio,
                  credentials: req.body.credentials
                },
                (error, result) => {
                  console.log(result);
                  var token = jwt.sign(
                    {
                      email: req.body.email,
                      user: resp.insertId,
                      username: req.body.username
                    },
                    Constants.jwtSecret,
                    { expiresIn: 60 * 60, issuer: "quora" }
                  );
                  res.send({ token: token });
                }
              );
            }
          }
        );
      } else {
        res.send({ error: "User Already Exists" });
      }
    }
  });
});
// app.use("/question", questionRoutes);
// app.use(paginate.middleware(10, 50));
app.use("/question", questionRoutes);
app.use("/answer", answerRoutes);
app.use("/comment", require("./api/routes/comment"));
app.use("/users", userRoutes);
app.use("/vote", require("./api/routes/vote.js"));
app.use("/topic", topicRoutes);
app.use("/feed", feedRoutes);
app.use("/chat", chatRoutes);

app.listen(3001);
console.log("Server Listening on port 3001");
