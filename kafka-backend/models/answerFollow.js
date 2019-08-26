var mongoose = require('mongoose');;
var Schema = mongoose.Schema;


var answerFollowSchema = mongoose.Schema({
    answerID: {type: Schema.Types.ObjectId, ref: "Answer"},
    userID:  {type: Schema.Types.ObjectId, ref: "User"}
});

var answerFollow = mongoose.model("answerFollow", answerFollowSchema);
module.exports = answerFollow;