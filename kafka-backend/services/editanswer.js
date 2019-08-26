var Answer = require("../models/Answers.model");
const db = require("../../backend/config/db");
const mongoose = require("mongoose");

function handle_request(msg, callback) {
  console.log("Inside Kafka Method Edit Answer.Answer ", msg.body);
  Answer.findByIdAndUpdate({ _id: msg.answerid }, { answer: msg.answer })
    .then(res => {
      console.log("Saved edited answer ");
      callback(null, res);
    })
    .catch(err => {
      console.log("Error editing answer ");
      callback(null, err);
    });

  console.log("Inside  Kafka Backend Edit Answer!");
}

exports.handle_request = handle_request;
