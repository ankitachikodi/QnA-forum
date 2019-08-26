//var Comment = require(...)
const Vote = require('../models/commentvote.model');
const db = require('../config/db');
const mongoose = require('mongoose')


function handle_request(msg, callback) {

    console.log("In commentvote handle_request service: ", msg);

    var tmp = {
        userID: msg.userid,
        subjectID: msg.commentid,
        voteType: msg.voteType,
        voteFor: msg.voteFor
    };

    Vote
        .findOne(
            { userID: tmp.userID, subjectID: tmp.subjectID }, function (err, docs) {
                if (docs) {
                    if (docs.voteType === tmp.voteType) {
                        Vote
                            .deleteMany(
                                { userID: tmp.userID,  subjectID: tmp.subjectID }, null
                            )
                            .then(res => {
                                console.log("Same Vote, Vote Removed");
                                callback(null, res);
                            });     
                    } else {
                        Vote
                            .deleteMany(
                                { userID: tmp.userID,  subjectID: tmp.subjectID }, null
                            )
                            .then(res => {
                                console.log("If Already Voted, Vote Removed");
                                //callback(null, res);
                                const newVote = new Vote({
                                    _id: new mongoose.Types.ObjectId(),
                                    userID: tmp.userID,
                                    voteType: tmp.voteType,
                                    subjectID: tmp.subjectID,
                                    voteFor: tmp.voteFor
                                });
                                newVote
                                    .save()
                                    .then(result => {
                                        console.log("Result: ", result);
                                        callback(null, result);
                                    })
                                    .catch(err => {
                                        console.log("Error: ", err);
                                        callback(null, err);
                                    });
                            });    
                        

                    }         
                } else {  
                    const newVote = new Vote({
                        _id: new mongoose.Types.ObjectId(),
                        userID: tmp.userID,
                        voteType: tmp.voteType,
                        subjectID: tmp.subjectID,
                        voteFor: tmp.voteFor
                    });
                    newVote
                        .save()
                        .then(result => {
                            console.log("Result: ", result);
                            callback(null, result);
                        })
                        .catch(err => {
                            console.log("Error: ", err);
                            callback(null, err);
                        });
                }
            }
        );
}

exports.handle_request = handle_request;