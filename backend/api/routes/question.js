const express =require('express')
const Question = require('../../../kafka-backend/models/questions.model');
const mongoose=require('mongoose')
const router=express.Router();
const auth = require('../../auth-guard');
var kafka = require('../../kafka/client');
router.post("/addquestion",  (req, res) => {
  if (req.body.token) {
    auth.checkLogin(req.body.token,  data => {
      if (data.userid) {
        const info = {
          question: req.body.question,
          userID: data.userid,
          topicID: req.body.topicID
        };
        kafka.make_request("question", info, function(err, result) {
          console.log(`this is the callback for "answer" make_request`);
          if (err) {
            console.log("Error in adding question.", err);
            res.writeHead(400, {
              "Content-type": "text/plain"
            });
            res.end("Error in adding question.");
          } else {
            console.log("question details saved successfully.", result);

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

router.post("/follow", (req, res) => {
  if (req.body.token) {
    console.log("Request body inside question Follow: ->", req.body);
    auth.checkLogin(req.body.token, data => {
      console.log(data);
      //req.body => {token:token, userid:data.userid, followedID:data.followedID}
      if (data.userid) {
        kafka.make_request(
          "questionFollow",
          { userid: data.userid, questionid: req.body.questionid },
          (error, result) => {
            res.status(200).json(result);
          }
        );
      } else {
        res.send({ error: data.error.message });
      }
    });
  } else {
    res
      .status(200)
      .json({ err: "Invalid request. No token present in request body!" });
  }
});

router.get("/getquestionstopic", (req, res) => {
  if (req.query.token) {
    auth.checkLogin(req.query.token, data => {
      if (data.userid) {
        const info = {
          userID: data.userid
        };
        kafka.make_request("getquestionstopic", info, function(err, result) {
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
      } else {
        res.send({ error: data.error.message });
      }
    });
  } else {
    res.send({ error: "No Token sent" });
  }
});

// router.get("/getquestions", (req, res) => {
//   if (req.body.token) {
//     auth.checkLogin(req.body.token, data => {
//       if (data.userid) {
//         const info = {
//           userID: data.userid
//           // userID: req.query.userid ? req.query.userid : data.userid
//         };

//         kafka.make_request("getQuestions", info, function(err, result) {
//           console.log(`this is the callback for "question" make_request`);
//           if (err) {
//             console.log("Error in adding question.", err);
//             res.writeHead(400, {
//               "Content-type": "text/plain"
//             });
//             res.end("Error in adding question.");
//           } else {
//             console.log("question details saved successfully.", result);
//             // response.writeHead(200, {
//             //     'Content-type': 'text/plain'
//             // });
//             //res.end('Adding a property successful!');
//             res.status(200).json({ result });
//           }
//         });
//       } else {
//         res.send({ error: data.error.message });
//       }
//     });
//   } else {
//     res.send({ error: "No Token sent" });
//   }
// });


router.get("/getquestions", (req, res) => {

  if (req.query.token) {
    auth.checkLogin(req.query.token, data => {
      if (data.userid) {
        const info = {
          userID: data.userid
        };
        kafka.make_request("getQuestions", info, function (err, result) {
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
      } else {
        res.send({ error: data.error.message });
      }
    });
  } else {
    res.send({ error: "No Token sent" });
  }
});

router.get("/getquestionstopic", (req, res) => {

  if (req.query.token) {
    auth.checkLogin(req.query.token, data => {
      if (data.userid) {
        const info = {
          userID: data.userid
        };
        kafka.make_request("getquestionstopic", info, function(
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

module.exports=router;