var AnswerBookmark = require("../models/answerbookmark.model");
const db = require("../../backend/config/db");
const mongoose = require("mongoose");

function handle_request(msg, callback) {
  console.log("Inside Kafka Method getbookmarkall");
  AnswerBookmark.find()
    .populate("answerID")
    .populate("ownerID")
    .exec()
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      console.log("Error getting booked marked answer ");
      callback(null, err);
    });
}

exports.handle_request = handle_request;
