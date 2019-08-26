const express = require("express");
const router = express.Router();
const Auth = require("../../auth-guard");
const kafka = require("../../kafka/client");

router.post("/answervote", function(req, res, next) {
  console.log("Inside /answervote POST Request");
  console.log("Req Body : ", req.body);

  if (req.body.token) {
    console.log("Request body inside Answer Vote: ->", req.body);
    Auth.checkLogin(req.body.token, data => {
      console.log(data);
      //req.body => {token:token, userid:data.userid, followedID:data.followedID}
      if (data.userid) {
        kafka.make_request(
          "answervote",
          {
            userid: data.userid,
            answerid: req.body.answerid,
            voteType: req.body.voteType
          }, //voteType = ("true" or "false")
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

  // var varObj = {
  //     // answerid: req.body.answerid,
  //     // userid: req.body.userid,
  //     // voteType: req.body.voteType,
  //     // authToken: req.body.authToken,
  //     // voteFor: "answer"
  // };
  // //const{answerid, commentText, authToken} = req.body;
  // Auth.checkLogin(req.body.authToken, (user_data) => {
  //     if (user_data) {
  //         varObj = {
  //             answerid: req.body.answerid,
  //             userid: user_data.userid,
  //             voteType: req.body.voteType,
  //             voteFor: "answer"
  //         }
  //         kafka.make_request('answervote', varObj, function(err, result) {
  //             console.log(result);
  //             if (err) {
  //                 console.log("Error /answervote: ", err);
  //                 res.writeHead(400, {
  //                     'Content-type': 'text/plain'
  //                 });
  //                 res.end('Error in answervote');
  //             } else {
  //                 console.log("Success response: ", result);
  //                 res.end('Success');
  //             }
  //         });
  //     } else {
  //         console.log("Error /answervote: ", "User Not Found!");
  //         res.writeHead(400, {
  //             'Content-type': 'text/plain'
  //         });
  //         res.end('Error in answervote');
  //     }
  // });
});

router.post("/commentvote", function(req, res, next) {
  console.log("Inside /commentvote POST Request");
  console.log("Req Body : ", req.body);

  var varObj = {
    // commentid: req.body.commentid,
    // userid: req.body.userid,
    // voteType: req.body.voteType,
    // authToken: req.body.authToken,
    // voteFor: "comment"
  };
  //const{commentid, commentText, authToken} = req.body;
  Auth.checkLogin(req.body.authToken, user_data => {
    if (user_data) {
      varObj = {
        commentid: req.body.commentid,
        userid: user_data.userid,
        voteType: req.body.voteType,
        voteFor: "comment"
      };
      kafka.make_request("commentvote", varObj, function(err, result) {
        console.log(result);
        if (err) {
          console.log("Error /commentvote: ", err);
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          res.end("Error in commentvote");
        } else {
          console.log("Success response: ", result);
          res.status(200).send(result);
        }
      });
    } else {
      console.log("Error /commentvote: ", "User Not Found!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in commentvote");
    }
  });
});

router.get("/commentvoteuser", function(req, res, next) {
  console.log("Inside /commentvoteuser GET Request");
  console.log("Req Body : ", req.query);

  var varObj = {
    // commentid: req.body.commentid,
    // userid: req.body.userid,
    // voteType: req.body.voteType,
    // authToken: req.body.authToken,
    // voteFor: "comment"
  };
  Auth.checkLogin(req.body.authToken, user_data => {
    if (user_data) {
      //const{commentid, commentText, authToken} = req.body;
      varObj = {
        commentid: req.query.commentid
      };
      kafka.make_request("getcommentvote", varObj, function(err, result) {
        console.log(result);
        if (err) {
          console.log("Error /getcommentvote: ", err);
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          res.end("Error in getcommentvote");
        } else {
          console.log("Success response: ", result);
          let returnResult = result.filter(
            vote => vote.userid === user_data.userid
          );
          let returnValue = 0;
          if (returnResult.length > 0) {
            if (returnResult.voteType === "true") {
              returnValue = 1;
            } else if (returnResult.voteType === "false") {
              returnValue = 1;
            }
          }
          console.log("Success response(filtered): ", returnValue);
          res.status(200).send(returnValue);
        }
      });
    } else {
      console.log("Error /commentvote: ", "User Not Found!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in commentvote");
    }
  });
});

router.get("/commentvotetotal", function(req, res, next) {
  console.log("Inside /commentvotetotal GET Request");
  console.log("Req Body : ", req.query);

  var varObj = {
    // commentid: req.body.commentid,
    // userid: req.body.userid,
    // voteType: req.body.voteType,
    // authToken: req.body.authToken,
    // voteFor: "comment"
  };
  //const{commentid, commentText, authToken} = req.body;
  varObj = {
    commentid: req.query.commentid
  };
  kafka.make_request("getcommentvote", varObj, function(err, result) {
    console.log(result);
    if (err) {
      console.log("Error /getcommentvote: ", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in getcommentvote");
    } else {
      console.log("Success response: ", result);
      returnResult1 = result.filter(vote => vote.voteType === "true");
      returnResult = { total: returnResult1.length };
      console.log("Success response(filtered): ", returnResult);
      res.status(200).send(returnResult);
    }
  });
});

router.get("/answervoteuser", function(req, res, next) {
  console.log("Inside /answervoteuser GET Request");
  console.log("Req Body : ", req.query);

  var varObj = {
    // commentid: req.body.commentid,
    // userid: req.body.userid,
    // voteType: req.body.voteType,
    // authToken: req.body.authToken,
    // voteFor: "comment"
  };
  //const{commentid, commentText, authToken} = req.body;
  Auth.checkLogin(req.body.authToken, user_data => {
    if (user_data) {
      //const{commentid, commentText, authToken} = req.body;
      varObj = {
        answerid: req.query.answerid
      };
      kafka.make_request("getanswervote", varObj, function(err, result) {
        console.log(result);
        if (err) {
          console.log("Error /getanswervote: ", err);
          res.writeHead(400, {
            "Content-type": "text/plain"
          });
          res.end("Error in getanswervote");
        } else {
          console.log("Success response: ", result);
          returnResult = result.filter(
            vote => vote.userid === user_data.userid
          );
          console.log("Success response(filtered): ", returnResult);
          res.status(200).send(returnResult);
        }
      });
    } else {
      console.log("Error /getanswervote: ", "User Not Found!");
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in getanswervote");
    }
  });
});

router.get("/answervotetotal", function(req, res, next) {
  console.log("Inside /answervotetotal GET Request");
  console.log("Req Body : ", req.query);

  var varObj = {
    // commentid: req.body.commentid,
    // userid: req.body.userid,
    // voteType: req.body.voteType,
    // authToken: req.body.authToken,
    // voteFor: "comment"
  };
  //const{commentid, commentText, authToken} = req.body;
  varObj = {
    answerid: req.query.answerid
  };
  kafka.make_request("getanswervote", varObj, function(err, result) {
    console.log(result);
    if (err) {
      console.log("Error /getanswervote: ", err);
      res.writeHead(400, {
        "Content-type": "text/plain"
      });
      res.end("Error in getanswervote");
    } else {
      console.log("Success response: ", result);
      returnResult1 = result.filter(vote => vote.voteType === "true");
      returnResult2 = result.filter(vote => vote.voteType === "false");
      total = returnResult1.length - returnResult2.length;
      returnResult = { total: total };
      console.log("Success response(filtered): ", returnResult);
      res.status(200).send(returnResult);
    }
  });
});

module.exports = router;
