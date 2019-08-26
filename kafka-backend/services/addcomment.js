//var Comment = require(...)
const Comment = require('../models/comment.model');
const db = require('../config/db');
const mongoose = require('mongoose')



function handle_request(msg, callback) {
  console.log("In addcomment handle_request service: ", msg);

  const newComment = new Comment({
    _id: new mongoose.Types.ObjectId(),
    answerID: msg.answerid,
    comment: msg.commentText,
    userID: msg.userid
  });
  newComment
    .save()
    .then(result => {
      console.log("Result: ", result);

      callback(null, result);
    })
    .catch(err => {
      console.log("Error: ", err);
      callback(null, err);
    });
}

exports.handle_request = handle_request;
