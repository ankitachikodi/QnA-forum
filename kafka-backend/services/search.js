const Question = require("../models/questions.model");
const User = require("../models/User.model");
const Topics = require("../models/Topic.model");
const db = require('../config/db');
const mongoose = require('mongoose')


function handle_request(msg, callback) {

    console.log("In content handle_request service: ", msg);

    Promise.all([
        Question.find({ 'question' : { '$regex' : msg.search, '$options' : 'i' } }).exec(),
        User.find({ 'userName' : { '$regex' : msg.search, '$options' : 'i' } }).exec(),
        Topics.find({ 'topicName' : { '$regex' : msg.search, '$options' : 'i' } }).exec(),
    ]).then((result) => {
        console.log("Result: ", result);
        callback(null, result);
    }).catch(err => {
        console.log("Error: ", err);
        callback(null, err);
    });
}

exports.handle_request = handle_request;