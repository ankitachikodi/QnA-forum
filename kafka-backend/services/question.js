var Question = require("../models/questions.model");
const db = require("../../backend/config/db");
const mongoose = require("mongoose");



function handle_request(msg, callback) {
  console.log("Inside Kafka Method add-course. Message ", msg.body);
  //const { topicID, question, userID, date } = msg.body;
  const questions = new Question({
    topicID: msg.topicID,
    question: msg.question,
    userID: msg.userID,
  });

  console.log("Inside  Kafka Backend ADD Course!");

  questions
    .save()
    .then(result => {
      console.log("Saved new question to DB ");
      callback(null, result);
    })
    .catch(err => {
      console.log("Error saving new course to db:", err);
      callback(null, err);
    });
}

exports.handle_request = handle_request;
