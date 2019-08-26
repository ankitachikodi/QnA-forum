// var Answer = require('../models/Answers.model');
// var user = require('../models/userFollow');
var question = require("../models/questions.model");
var user = require("../models/User.model");
var questionFollow = require("../models/questionFollow");
const db = require("../../backend/config/db");
const mongoose = require("mongoose");


function handle_request(msg, callback) {
    console.log('Inside Kafka Method question-follow. Message ', JSON.stringify(msg));

    console.log('Inside  Kafka Backend user Follow!');

    questionFollow.find({questionID: msg.questionid})
      .then(follow => {
        let myFollow = follow.filter(v => {
          return v.userID === msg.userid;
        })
        if(myFollow.length > 0) {
          questionFollow.deleteOne({userID: msg.userid, questionID: msg.questionid})
          .then(result => {
            console.log(follow.length-1);
            callback(null,follow.length-1);
          })
          .catch(err => {
            console.log("Error saving new questionFollow to db:", err);
            callback(null,err)
          });
        }else{
          const questionid = msg.questionid;
          const userid = msg.userid;
          const question_follow = new questionFollow({
              questionID: questionid,
              userID: userid
          });
          question_follow
            .save()
            .then(result => {
              console.log("Saved new questionFollow to DB ");
              callback(null,follow.length+1)
            })
            .catch(err => {
              console.log("Error saving new questionFollow to db:", err);
              callback(null,err)
            });
        }
      })
 
}

exports.handle_request = handle_request;
