var mongoose = require('mongoose');;
var Schema = mongoose.Schema;

var userFollowSchema = mongoose.Schema({
    followerID: {type: Number, ref: "User"},
    followedID: {type: Number, ref: "User"}
});

var userFollow = mongoose.model("userFollow", userFollowSchema);
module.exports = userFollow;