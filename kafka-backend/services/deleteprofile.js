var Question = require('../models/questions.model');
var Answer = require('../models/Answers.model');
var TopicFollow = require('../models/TopicFollow.model');
var AnswerVote = require('../models/answervote.model');
var QuestionFollow = require('../models/questionFollow');
var userFollow = require('../models/userFollow');
var Comments = require('../models/comment.model');
var db = require('../config/db');

try {
    db.connect();
    console.log("connected")
}
catch (e) {
    console.log(e);
}

const handle_request = (msg, callback) => {
    console.log(msg);
    userFollow.find().or([{followerID: msg.userid},{followedID: msg.userid}]).then(result => {
        QuestionFollow.find({userID: msg.userid}).then(result1 => {
            AnswerVote.find({userID: msg.userid}).then(result2 => {
                Comments.find({userID: msg.userid}).then(result3 => {
                    TopicFollow.find({user: msg.userid}).then(result4 => {
                        Answer.find({ownerID: msg.userid}).then(result5 => {
                            Question.find({userID: msg.userid}).then(result6 => {
                                callback(null,{result: result, result1: result1, result2: result2, result3: result3, result4: result4, result5: result5, result6: result6});
                            })
                        })
                    })
                })
            })
        })
    }).catch(error => {
        callback(null, error);
    })
}

exports.handle_request = handle_request;