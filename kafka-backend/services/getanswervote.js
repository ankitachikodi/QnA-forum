//var Comment = require(...)
const Comment = require('../models/comment.model');
const Vote = require('../models/answervote.model');
const db = require('../config/db');
const mongoose = require('mongoose')

function handle_request(msg, callback) {

    console.log("In getanswervote handle_request service: ", msg);

    Vote
        .find({
            subjectID: msg.answerid,
        }).populate('subjectID')
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