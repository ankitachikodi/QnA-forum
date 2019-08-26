var userFollow = require("../models/userFollow");
var user = require('../models/User.model');
const Thread = require("../models/conversation.model");

const db = require("../../backend/config/db");
const mongoose = require("mongoose");

const handle_request = async (msg, callback) => {
  console.log("[CHAT] INFO : Message recived : ", msg);
  // const result = { kafkastatus: "recived" };
  // callback(null, { status: "success", payLoad: result });
  try {
    const {
      sender,
      receiver
    } = msg
    const first_participant = sender > receiver ? sender : receiver
    const second_participant = sender > receiver ? receiver : sender
    const result = await Thread.findOne({ first_participant, second_participant }).exec()

    const senderName = await getNameById(sender);
    const receiverName = await getNameById(receiver);
    const name = {
      sender: senderName,
      receiver: receiverName
    };
    callback(null, { status: "success", payLoad: result, name });
  } catch (error) {
    callback(null, { status: "error", error });
  }
};

const getNameById = async (userId) => {
  const userData = await user.findById(userId)
  return userData.firstName + " " + userData.familyName
}

exports.handle_request = handle_request;
