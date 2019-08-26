//var Comment = require(...)
const Comment = require('../models/comment.model');
const Vote = require('../models/commentvote.model');
const db = require('../config/db');
const mongoose = require('mongoose')

function handle_request(msg, callback) {

    console.log("In getcommentvote handle_request service: ", msg);

    Vote
        .find({
            subjectID: msg.commentid,
        })
        .then(result => {
            console.log("Result: ", result);
            callback(null, result);
        })
        .catch(err => {
            console.log("Error: ", error);
            callback(null, err);
        })
}

exports.handle_request = handle_request;