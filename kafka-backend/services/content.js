const Question = require("../models/questions.model");
const Answer = require("../models/Answers.model");
const FollowQuestion = require("../models/questionFollow");
const userFollow = require("../models/userFollow.js");
const AnswerBookmark = require("../models/answerbookmark.model");
const db = require('../config/db');
const mongoose = require('mongoose')


function handle_request(msg, callback) {

    console.log("In content handle_request service: ", msg);

    Promise.all([
        Question.find({
            userID: msg.userid,
        }).exec(),
        Answer.find({
            ownerID: msg.userid
        }).populate('questionID').exec(),
        userFollow.find({
            followedID: msg.userid
        }).populate('followerID').exec(),
        userFollow.find({
            followerID: msg.userid
        }).populate("followedID").exec(),
        AnswerBookmark.find({
            ownerID: msg.userid
        }).populate("answerID").exec()
    ]).then((result) => {
        if (msg.filter === "question") {
            result = result[0];
        } else if (msg.filter === "answer") {
            result = result[1];
        } else {
            if (typeof msg.sort !== 'undefined') {
                result = result[0].concat(result[1]);
            } else {
                result = result;
            }
        }
        if (msg.sort === "oldest") {
            result.sort(function(a, b) {
                return a.date > b.date;
            });          
        } else {
            result.sort(function(a, b) {
                return a.date < b.date;
            });
        }
        console.log("Result: ", result);
        callback(null, result);
    }).catch(err => {
        console.log("Error: ", err);
        callback(null, err);
    });
}

exports.handle_request = handle_request;