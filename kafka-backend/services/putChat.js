var userFollow = require("../models/userFollow");
// var user = require('../models/message.model');
const Thread = require("../models/conversation.model");

const db = require("../../backend/config/db");
const mongoose = require("mongoose");

const handle_request = async (msg, callback) => {
  console.log("[CHAT] INFO : Message recived : ", msg);
  // const result = { kafkastatus: "recived" };
  // callback(null, { status: "success", payLoad: result });
  try {
    const { sender, receiver, text } = msg;
    const first_participant = sender > receiver ? sender : receiver;
    const second_participant = sender > receiver ? receiver : sender;
    const result = await Thread.findOne({
      first_participant,
      second_participant
    }).exec();
    let thread;
    if (result) {
      thread = result;
    } else {
      const currentThread = new Thread({
        first_participant,
        second_participant
      });
      const newThread = await currentThread.save();
      thread = newThread;
    }
    const message = {
      sender: sender,
      body: text
    };
    thread.history.push(message);
    const updatedThread = await thread.save();
    callback(null, { status: "success", payLoad: updatedThread });
    // callback(null, { status: "success", payLoad: result });
  } catch (error) {
    callback(null, { status: "error", error });
  }
};

exports.handle_request = handle_request;
