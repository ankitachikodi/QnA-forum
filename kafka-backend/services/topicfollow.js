var TopicFollow = require("../models/TopicFollow.model");
var db = require("../config/db");
var mongoose = require("mongoose");

const handle_request = (msg, callback) => {
  let topicids = [];
  msg.topicid.forEach(v => {
    topicids.push(mongoose.Types.ObjectId(v));
  });
  console.log(topicids);

  TopicFollow.find({ user: msg.userid }, (error, res) => {
    topicids.forEach(v => {
      if (
        res.filter(v1 => {
          return v1.topic === v;
        }).length === 0
      ) {
        let topicFollow = new TopicFollow({
          user: msg.userid,
          topic: v
        });
        topicFollow.save().catch(err => {
          callback(err, err);
        });
      }
    });
    res.forEach(v => {
      if (
        topicids.filter(v1 => {
          return v1 === v.topic;
        }).length === 0
      ) {
        TopicFollow.deleteMany({ user: msg.userid, topic: v.topic }).catch(
          err => {
            callback(err, err);
          }
        );
      }
    });
    callback(null, { success: true });
  });
};

exports.handle_request = handle_request;
