//var Comment = require(...)
const AnswerBookmark = require("../models/answerbookmark.model");
const db = require("../../backend/config/db");
const mongoose = require("mongoose");


function handle_request(msg, callback) {
  const answerBookmark = new AnswerBookmark({
    _id: new mongoose.Types.ObjectId(),
    answerID: msg.answerID,
    ownerID: msg.ownerID
  });
  answerBookmark
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
