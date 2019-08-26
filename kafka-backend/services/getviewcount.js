var Viewcount = require("../models/viewcount.model");
const db = require("../../backend/config/db");
const mongoose = require("mongoose");

function handle_request(msg, callback) {
  console.log("Inside Kafka Method viewcount: ",msg);

  if (msg.userID != null) {
    Viewcount.find({ userID: msg.userID })
            .exec()
            .then(data => {
                console.log("Success getting Profile viewcount ");
                callback(null, data);
        })
        .catch(err => {
            console.log("Error getting Profile viewcount ");
            callback(null, err);
        });
  } else {
    Viewcount.find({"answerID": {$exists:true}})
            .populate("answerID")
            .exec()
            .then(data => {
                console.log("Success getting Answer viewcount ");
                callback(null, data);
        })
        .catch(err => {
            console.log("Error getting Answer viewcount ");
            callback(null, err);
        });
  }
}

exports.handle_request = handle_request;
