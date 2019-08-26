var Answer = require('../models/Answers.model');
var user = require('../models/userFollow');
const db=require('../../backend/config/db')
const mongoose=require('mongoose')



function handle_request(msg, callback) {
    console.log('Inside Kafka Method answer-follow. Message ', JSON.stringify(msg));
    
    const followerID = msg.followerid;
    const followedID = msg.followedid;
    const userFollow = new user({
       followerID: followerID,
       followedID: followedID
    });
    
    console.log('Inside  Kafka Backend user Follow!');

    user
        .findOne(
          {followerID: followerID, followedID: followedID}, function (err, docs) {
            if (docs) {
              user.deleteOne(
                { followerID: followerID, followedID: followedID }, null
              )
              .then(res => {
                console.log("Unfollowed");
                callback(null, res);
              });  
            } else {
                userFollow
                .save()
                .then(result => {
                  console.log("Saved new userFollow to DB ");
                  callback(null,result)
                })
                .catch(err => {
                  console.log("Error saving new usrFollow to db:", err);
                  callback(null,err)
                });
            }
          }
        )
}

exports.handle_request = handle_request;