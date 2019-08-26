const express = require('express')
const router = express.Router()
const Auth = require('../../auth-guard');
const kafka = require('../../kafka/client');
const Comment = require('../../../kafka-backend/models/comment.model');
const db = require('../../config/db');

//for mongo calls without kafka
try {
    db.connect();
    console.log("connected")
}
catch (e) {
    console.log(e);
}

router.post("/addcomment", function(req, res, next) {
  console.log("Inside /addcomment POST Request");
  console.log("Req Body : ", JSON.stringify(req.body));

  var varObj = {
    answerid: req.body.answerid,
    commentText: req.body.commentText, 
    authToken: req.body.authToken,
  };
//const{answerid, commentText, authToken} = req.body;
  Auth.checkLogin(varObj.authToken, (user_data) => {
      if (user_data) {
          varObj = {
              answerid: req.body.answerid,
              commentText: req.body.commentText, 
              userid: user_data.userid //for testing        
          }
          kafka.make_request('addcomment', varObj, function(err, result) {
              console.log(result);
              if (err) {
                  console.log("Error /addcomment: ", err);
                  res.writeHead(400, {
                      'Content-type': 'text/plain'
                  });
                  res.end('Error in addcomment');
              } else {
                  console.log("Success response: ", result);
                  res.status(200).send(result);
                  // if (results.code == 200){
                  //     console.log("200 response " + results);
                  //     res.status(200).send(results);
                  // }
                  // else {
                  //     console.log("Unsuccessful: ",results);
                  //     res.status(500).send({"message":"Operation failed!"});
                  // } 
              }
          });
      }
  });
});

router.get("/getcomments", function(req, res, next) {
  console.log("Inside /getcomments GET Request");
  console.log("Req Body : ", JSON.stringify(req.query));

  var varObj = {
    answerid: req.query.answerid,
    authToken: req.query.authToken
  };
  Auth.checkLogin(varObj.authToken, (user_data) => {
    kafka.make_request("getcomments", varObj, function(err, result) {
      console.log(result);
      if (err) {
        console.log("Error /getcomments: ", err);
        res.writeHead(400, {
          "Content-type": "text/plain"
        });
        res.end("Error in getcomments");
      } else {
        console.log("Success response: ", result);
        res.status(200).send(result);
      }
    });
  });
});

router.get('/getcommentsnokafka', function(req, res, next) {
  console.log("Inside /getcomments GET Request (NO KAFKA)");
  console.log("Req Body : ", JSON.stringify(req.body));

  var varObj = {
      answerid: req.body.answerid,
  };
  Comment
      .find({
          answerID: req.body.answerid
      })
      .then(result => {
          //console.log("Result: ", result);
          res.status(200).send(result);
      })
      .catch(err => {
          console.log("Error: ", err);
          res.end(err);
      })
});

//TODO
// /deletecomment

// router.post('/editcomment', function(req, res, next) {
//     console.log("Inside /editcomment POST Request");
//     console.log("Req Body : ",JSON.stringify(req.body));

//     var varObj = {
//          commentText: req.body.commentText,
//          authToken: req.body.authToken
//     }

//     kafka.make_request('editcomment',varObj, function(err, result) {
//         console.log(result);
//         if (err) {
//             console.log("Error /editcomment: ", err);
//             res.writeHead(400, {
//                 'Content-type': 'text/plain'
//             });
//             res.end('Error in editcomment');
//         } else {
//             console.log("Success response: ", result);
//             res.status(200).send(result);
//         }
//     })
// });

module.exports = router;
