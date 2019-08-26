// var Question = require("../models/questions.model");
// const db = require('../../backend/config/db')
// const mongoose = require('mongoose')
// try {
//     db.connect();
//     console.log("connected in get questions")
// }
// catch (e) {
//     console.log(e);
// }
// function handle_request(msg, callback) {
//     console.log('Inside Kafka Method Get Questions Message ', msg.body);
//     const userID = msg.userID; 
//     console.log('user id from services', userID)
//     Question.find({
//         userID: userID
//     })
//     .then(result => {
//         console.log("Result: ", result);
//         callback(null, result);
//       })
//       .catch(err => {
//         console.log("Error: ", error);
//         callback(null, err);
//       });

// }

// exports.handle_request = handle_request;



var Question = require("../models/questions.model");
const db = require('../../backend/config/db')
const mongoose = require('mongoose')

function handle_request(msg, callback) {
    console.log('Inside Kafka Method Get Questions Message ', msg.body);
    const userID = msg.userID;
    console.log('user id from services', userID)
    Question.find({
        userID: userID
    })
        .then(result => {
            console.log("Result: ", result);
            callback(null, result);
        })
        .catch(err => {
            console.log("Error: ", error);
            callback(null, err);
        });

}

exports.handle_request = handle_request;