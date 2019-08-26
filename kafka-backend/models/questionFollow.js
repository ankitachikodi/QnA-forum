var mongoose = require('mongoose');;
var Schema = mongoose.Schema;

var questionFollowSchema = mongoose.Schema({
    questionID: {type: Schema.Types.ObjectId, ref: "Question"},
    userID: {type: Number, ref: "User"}
});

var questionFollow = mongoose.model("questionFollow", questionFollowSchema);
module.exports = questionFollow;