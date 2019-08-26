var Question = require("../models/questions.model");
var user = require("../models/User.model");
var TopicFollow = require("../models/TopicFollow.model");
const db = require("../../backend/config/db");
const mongoose = require("mongoose");

function handle_request(msg, callback) {
  TopicFollow.find({ user: msg.userID }).exec(function(err, results) {
    var ids = results.map(function(el) {
      return el.topic;
    });
    console.log("idsfrom handle request", ids);
    Question.find({ topicID: { $in: ids } })
      .populate("topicID")
      .populate("userID")
      .exec(function(err, result) {
        callback(null, result);
      });
  });

  console.log("Inside  Kafka Backend Edit Answer!");
}

exports.handle_request = handle_request;
