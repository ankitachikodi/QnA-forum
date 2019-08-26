var Answer = require("../models/Answers.model");
const db = require("../../backend/config/db");
const mongoose = require("mongoose");
const Answervote = require("../models/answervote.model");


function handle_request(msg, callback) {
  console.log("In getanswerswithmostupvotes handle_request service: ", msg);

  Answervote.find()
    .populate('subjectID')
    .exec()
    .then(data => {
      callback(null, data);
    })
    .catch(err => {
      console.log("Error for getanswerswithmostupvotes ");
      callback(null, err);
    });
}

exports.handle_request = handle_request;
