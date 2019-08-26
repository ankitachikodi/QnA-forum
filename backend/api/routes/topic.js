const express = require("express");
const mongoose = require("mongoose");
const auth = require("../../auth-guard");
const router = express.Router();
var kafka = require("../../kafka/client");

router.get("/", (req, res) => {
  if (req.query.token) {
    auth.checkLogin(req.query.token, data => {
      if (data.userid) {
        kafka.make_request(
          "gettopics",
          { userid: data.userid },
          (error, result) => {
            if (error) {
              res.send({ error: error });
            } else {
              res.status(200).json({ topics: result });
            }
          }
        );
      } else {
        res.send({ error: data.error.message });
      }
    });
  } else {
    res.send({ error: "Token Not Sent" });
  }
});

router.post("/follow", (req, res) => {
  if (req.body.token) {
    auth.checkLogin(req.body.token, data => {
      if (data.userid) {
        kafka.make_request(
          "topicfollow",
          {
            userid: data.userid,
            topicid: req.body.topicid
          },
          (error, result) => {
            res.status(200).json(result);
          }
        );
      } else {
        res.send({ error: data.error.message });
      }
    });
  } else {
    res.send({ error: "Token Not Sent" });
  }
});

router.get("/getalltopics", (req, res) => {
  if (req.query.token) {
    auth.checkLogin(req.query.token, data => {
      if (data.userid) {
        kafka.make_request(
          "gettopics",
          { userid: data.userid },
          (error, result) => {
            if (error) {
              res.send({ error: error });
            } else {
              res.status(200).json({ topics: result });
            }
          }
        );
      } else {
        res.send({ error: data.error.message });
      }
    });
  } else {
    res.send({ error: "Token Not Sent" });
  }
});

module.exports = router;
