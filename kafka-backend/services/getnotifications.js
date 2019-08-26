var QuestionFollow = require('../models/questionFollow');
var Question = require('../models/questions.model');
var Answer = require('../models/Answers.model');

const handle_request = (msg, callback) => {
    QuestionFollow.find({userID: msg.userid}).select('questionID').then(resp =>{
        Question.find({userID: msg.userid}).select('_id question').then(resp1 => {
            let myquestions = resp1.map(v => {
                return v._id.toString();
            })
            let followedq = resp.filter(v => {
                return myquestions.indexOf(v.questionID.toString()) === -1;
            }).map(v1 => {
                return v1.questionID.toString();
            })

            Answer.find({questionID: {$in: followedq.concat(myquestions)}})
                .populate('ownerID', 'firstName familyName')
                .populate('questionID', 'question')
                .then(resp2 => {

                let myanswers = resp2.filter(v => {
                    return myquestions.filter(v1 => {
                        return v1 === v.questionID._id.toString();
                    }).length > 0;
                });

                let followedanswers = resp2.filter(v => {
                    return followedq.filter(v1 => {
                        return v.questionID._id.toString() === v1;
                    }).length > 0;
                });
                
                let response = [];

                myanswers.forEach(v=> {
                    response.push({
                        questionID: v.questionID._id,
                        question: v.questionID.question.substr(0,80),
                        ownerID: v.anonymousFlag ? null : v.ownerID._id,
                        owner: v.anonymousFlag ? null : v.ownerID.firstName + ' ' + v.ownerID.familyName,
                        answerID: v._id,
                        followedquestion: false,
                        date: v.date
                    })
                })

                followedanswers.forEach(v=> {
                    response.push({
                        questionID: v.questionID._id,
                        question: v.questionID.question.substr(0,80),
                        ownerID: v.anonymousFlag ? null : v.ownerID._id,
                        owner: v.anonymousFlag ? null : v.ownerID.firstName + ' ' + v.ownerID.familyName,
                        answerID: v._id,
                        followedquestion: true,
                        date: v.date
                    })
                })

                response.sort((a,b) => {
                    return a.date > b.date ? -1 : 1;
                });
                
                callback(null, {answers: response});
            })
        })
    })
}

exports.handle_request = handle_request;