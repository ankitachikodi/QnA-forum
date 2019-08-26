//var Comment = require(...)
const Comment = require('../models/comment.model');
const db = require('../config/db');
const mongoose = require('mongoose')

function handle_request(msg, callback) {

    console.log("In getcomments handle_request service: ", msg);

    Comment
        .find({
            answerID: msg.answerid
        }).populate('userID', 'firstName familyName profile')
        .then(result => {
            console.log("Result: ", result);
            callback(null, result);
        })
        .catch(err => {
            console.log("Error: ", err);
            callback(null, err);
        })
}

exports.handle_request = handle_request;