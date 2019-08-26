var userFollow = require("../models/userFollow");
var user = require('../models/User.model');
const Thread = require("../models/conversation.model");
// const ObjectId = require("mongoose").Types.ObjectId; 
const db = require("../../backend/config/db");
const mongoose = require("mongoose");

const handle_request = async (msg, callback) => {
  //console.log("[CHAT] INFO : Message recived : ", msg);
  // const result = { kafkastatus: "recived" };
  // callback(null, { status: "success", payLoad: result });
  try {

    const { userId } = msg;
    const allChats = await Thread.find({
    }).exec();
    // .or({ second_participant: userId })
    const result = allChats.filter(
      thread =>
        thread.first_participant.toString() === userId ||
        thread.second_participant.toString() === userId
    );

    try {
      if (result) {

        const response = [];


        for (let index = 0; index < result.length; index++) {
          const thread = result[index];
          let t = JSON.parse(JSON.stringify(thread));
          if (userId.toString() === thread.first_participant.toString()) {
            t.name = await getNameById(thread.second_participant)
          } else {
            t.name = await getNameById(thread.first_participant);
          }
          response.push(t);
        }

        callback(null, { status: "success", payLoad: response });
        return;
        // await result.forEach(async (thread) => {
        //   let t = JSON.parse(JSON.stringify(thread))
        //   console.log("IFE");
        //   //console.log(t)
        //   if (userId.toString() === thread.first_participant.toString()) {
        //     // //console.log(thread)
        //     t.name = await getNameById(thread.second_participant)
        //     //console.log(thread.name)
        //   } else {
        //     // //console.log(thread);
        //     t.name = await getNameById(thread.first_participant)
        //     //console.log(thread.name);
        //   }
        //   // //console.log("\n\n\n");
        //   //console.log(t);
        //   response.push(t)
        //   // //console.log(response);
        //   console.log("EOL");
        // })
        // console.log("AFE");


      }
      callback(null, { status: "success", payLoad: {} });
    } catch (error) {
      console.log(error)
      callback(null, { status: "success", payLoad: {} });
    }
    // //console.log("\n\n------\n");
    //console.log(response);

  } catch (error) {
    callback(null, { status: "error", error });
  }
};

const getNameById = async (userId) => {
  const userData = await user.findById(userId)
  return userData.firstName + " " + userData.familyName
}

exports.handle_request = handle_request;
