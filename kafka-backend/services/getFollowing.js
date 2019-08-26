var userFollow = require('../models/userFollow');
var user = require('../models/User.model');
const db=require('../../backend/config/db')
const mongoose=require('mongoose')

function handle_request(msg, callback) {
    console.log('Inside Kafka Method getFollowers-for a user. Message ', JSON.stringify(msg));
    
    const followerId = Number(msg.userId);
    
    console.log('Inside  Kafka Backend GET Followers for a user!');
   
    userFollow
        .find({followerID:followerId})
        .populate('followedID', 'firstName')
        .then(result => {
            console.log("GET userFollow after populate to DB ", result);
            callback(null,result)
        })
        .catch(err => {
            console.log("Error saving new userFollow to db:", err);
            callback(null,err)
        });
 
}

exports.handle_request = handle_request;