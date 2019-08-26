const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const kafka = require("../../kafka/client");
const auth = require("../../auth-guard");
//Add answer to a question

router.post("/answerquestion", (req, res) => {
  if (req.body.token) {
    auth.checkLogin(req.body.token, data => {
      if (data.userid) {
        const info = {
          questionID: req.body.questionID,
          ownerID: data.userid,
          answer: req.body.answer,
          anonymousFlag: req.body.anonymousFlag
        };
        kafka.make_request("answer", info, function(err, result) {
          console.log(`this is the callback for "answer" make_request`);
          if (err) {
            console.log("Error in adding answer.", err);
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in adding answer.");
          } else {
            console.log("answer details saved successfully.", result);
            // response.writeHead(200, {
            //     'Content-type': 'text/plain'
            // });
            //res.end('Adding a property successful!');
            res.status(200).json({ message: "success!" });
          }
        });
      } else {
        res.send({ error: data.error.message });
      }
    });
  } else {
    res.send({ error: "No Token sent" });
  }
});

router.patch("/editanswer", (req, res) => {
  if (req.body.token) {
    auth.checkLogin(req.body.token, data => {
      if (data.userid) {
        const info = {
          answerid: req.body.answerid,
          ownerID: data.userid,
          answer: req.body.answer
        };
        kafka.make_request("editanswer", info, function(err, result) {
          console.log(`this is the callback for "edit answer" make_request`);
          if (err) {
            console.log("Error in adding edit answer.", err);
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in adding answer.");
          } else {
            console.log("answer details saved successfully.", result);
            res.status(200).json({ message: "success!" });
          }
        });
      } else {
        res.send({ error: data.error.message });
      }
    });
  } else {
    res.send({ error: "No Token sent" });
  }
});

router.get("/getanswers", (req, res) => {
  kafka.make_request("getanswers", req.query, function(err, result) {
    console.log(`this is the callback for "answer" make_request`);
    if (err) {
      console.log("Error in adding answer.", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in adding answer.");
    } else {
      console.log("answer details saved successfully.", result);
      res.status(200).json({ result });
    }
  });
});

router.post("/answerbookmark", (req, res) => {
  if (req.body.token) {
    auth.checkLogin(req.body.token, data => {
      if (data.userid) {
        const info = {
          answerID: req.body.answerID,
          ownerID: data.userid
        };
        console.log("information", info);
        kafka.make_request("answerbookmark", info, function(err, result) {
          console.log(`this is the callback for "answer" make_request`);
          if (err) {
            console.log("Error in adding answer.", err);
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in adding answer.");
          } else {
            console.log("answer details saved successfully.", result);

            res.status(200).json({ message: "success!" });
          }
        });
      } else {
        res.send({ error: data.error.message });
      }
    });
  } else {
    res.send({ error: "No Token sent" });
  }
});
router.get("/getbookmarkedanswers", (req, res) => {
  kafka.make_request("getbookmarkedanswers", req.query, function(err, result) {
    console.log(`this is the callback for "answer" make_request`);
    if (err) {
      console.log("Error in adding answer.", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in adding answer.");
    } else {
      console.log("answer details saved successfully.", result);
      res.status(200).json({ result });
    }
  });
});

// /getanswerswithmostupvotes	Get user's top 10 answers with most upvotes	authToken	GET	{ [answerid: int, answer: string, voteCount: int] }
// /getanswerswithmostdownvotes	Get user's top 5 answers with most downvotes	authToken	GET	{ [answerid: int, answer: string, voteCount: int] }
// /getanswerswithmostbookmarks	Get user's top answers with most bookmarks	authToken	GET	{ [answerid: int, answer: string, voteCount: int] }

router.get("/getanswerswithmostupvotes", (req, res) => {
  if (req.body.token) {
    auth.checkLogin(req.body.token, data => {
      if (data.userid) {
        const info = {
          userID: data.userid
        };
        kafka.make_request("getanswerswithmostupvotes", info, function(
          err,
          result
        ) {
          console.log(`this is the callback for "answer" make_request`);
          if (err) {
            console.log("Error in adding answer.", err);
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in adding answer.");
          } else {
            console.log("answer details saved successfully.", result);
            // response.writeHead(200, {
            //     'Content-type': 'text/plain'
            // });
            //res.end('Adding a property successful!');
            res.status(200).json({ result });
          }
        });
      } else {
        res.send({ error: data.error.message });
      }
    });
  } else {
    res.send({ error: "No Token sent" });
  }
});
module.exports = router;
