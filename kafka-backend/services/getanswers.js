var Answer = require("../models/Answers.model");
var Question = require("../models/questions.model");
const db = require("../../backend/config/db");
const mongoose = require("mongoose");


function handle_request(msg, callback) {
  console.log("Inside Kafka Method Get Answers.Answer", msg.questionID);
  Question.findOne({ _id: msg.questionID })
    .populate("topicID")
    .exec()
    .then(question => {
      Answer.find({ questionID: msg.questionID })
        .populate("ownerID")
        .exec()
        .then(answers => {
          callback(null, { question: question, answer: answers });
        });
    });
  console.log("Inside  Kafka Backend Edit Answer!");
}

exports.handle_request = handle_request;
