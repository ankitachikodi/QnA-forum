var Answer = require('../models/Answers.model');
var AnswerVote = require('../models/answervote.model');
var db = require('../config/db');

try {
    db.connect();
    console.log("connected")
}
catch (e) {
    console.log(e);
}

const handle_request = (msg, callback) => {
    Answer.findOne({_id: msg.answerID}).then(answer => {
        AnswerVote.find({subjectID: answer._id}).then(votes => {
            let upvotes = votes.filter(v => {
                return v.voteType === 'true';
            }).length;
            let downvoted = votes.filter(v => {
                return v.voteType === 'false' && v.userID === msg.userid;
            }).length > 0;
            let upvoted = votes.filter(v => {
                return v.voteType === 'true' && v.userID === msg.userid;
            }).length > 0;
            callback(null,{
                answer: answer.answer,
                upvotes: upvotes,
                upvoted: upvoted,
                downvoted: downvoted
            });
        });
    })
}

exports.handle_request = handle_request;