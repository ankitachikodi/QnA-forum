var AnswerBookmark = require("../models/answerbookmark.model");
const db = require("../../backend/config/db");
const mongoose = require("mongoose");

function handle_request(msg, callback) {
  console.log("Inside Kafka Method Get booked marked answer");
  AnswerBookmark.find({ ownerID: msg.userID })
    .populate("answerID")
    .populate("ownerID")
    .exec()
    .then(data => {
      console.log(data);
      callback(null, data);
    })
    .catch(err => {
      console.log("Error getting booked marked answer ");
      callback(null, err);
    });

  console.log("Inside  Kafka Backend booked marked answer!");
}

exports.handle_request = handle_request;
