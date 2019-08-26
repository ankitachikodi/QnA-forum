//var Comment = require(...)
const Vote = require('../models/answervote.model');
const db = require('../config/db');
const mongoose = require('mongoose')



function handle_request(msg, callback) {

    console.log("In answervote handle_request service: ", msg);

    Vote.find({subjectID: (msg.answerid)}).then(votes => {
        let myVotes = votes.filter(v => {
            return v.userID === msg.userid;
        });
        let upvotes = votes.filter(v => {
            return v.userID === msg.userid && v.voteType === 'true';
        });
        if(myVotes.length > 0) {
            if(myVotes[0].voteType === msg.voteType) {
                Vote.deleteMany({userID: msg.userid, subjectID: (msg.answerid)})
                .then(result => {
                    callback(null,votes.length - 1);
                })
            }else{
                Vote.update({userID: msg.userid, subjectID: new mongoose.Types.ObjectId(msg.answerid)}, {$set: {voteType: msg.voteType}})
                    .then(result => {
                        console.log(upvotes.length);
                        if(msg.voteType === 'true'){
                            callback(null,upvotes.length + 1);
                        }else{
                            callback(null,votes.length - 1);
                        }
                    })
            }
        }else{
            let vote = new Vote({
                userID: msg.userid,
                voteType: msg.voteType,
                subjectID: new mongoose.Types.ObjectId(msg.answerid),
                voteFor: 'answer'
            })
            vote.save().then(result =>{
                if(msg.voteType === 'true'){
                    callback(null, votes.length + 1);
                }else{
                    callback(null,votes.length);
                }
            })
        }
    })




    // Vote
    //     .findOne(
    //         { userID: tmp.userID, subjectID: tmp.subjectID }, function (err, docs) {
    //             if (docs) {
    //                 if (docs.voteType === tmp.voteType) {
    //                     Vote
    //                         .deleteMany(
    //                             { userID: tmp.userID,  subjectID: tmp.subjectID }, null
    //                         )
    //                         .then(res => {
    //                             console.log("Same Vote, Vote Removed");
    //                             callback(null, res);
    //                         });     
    //                 } else {
    //                     Vote
    //                         .deleteMany(
    //                             { userID: tmp.userID,  subjectID: tmp.subjectID }, null
    //                         )
    //                         .then(res => {
    //                             console.log("If Already Voted, Vote Removed");
    //                             //callback(null, res);
    //                             const newVote = new Vote({
    //                                 _id: new mongoose.Types.ObjectId(),
    //                                 userID: tmp.userID,
    //                                 voteType: tmp.voteType,
    //                                 subjectID: tmp.subjectID,
    //                                 voteFor: tmp.voteFor
    //                             });
    //                             newVote
    //                                 .save()
    //                                 .then(result => {
    //                                     console.log("Result: ", result);
    //                                     callback(null, result);
    //                                 })
    //                                 .catch(err => {
    //                                     console.log("Error: ", err);
    //                                     callback(null, err);
    //                                 });
    //                         });    
                        

    //                 }         
    //             } else {  
    //                 const newVote = new Vote({
    //                     _id: new mongoose.Types.ObjectId(),
    //                     userID: tmp.userID,
    //                     voteType: tmp.voteType,
    //                     subjectID: tmp.subjectID,
    //                     voteFor: tmp.voteFor
    //                 });
    //                 newVote
    //                     .save()
    //                     .then(result => {
    //                         console.log("Result: ", result);
    //                         callback(null, result);
    //                     })
    //                     .catch(err => {
    //                         console.log("Error: ", err);
    //                         callback(null, err);
    //                     });
    //             }
    //         }
    //     );
}

exports.handle_request = handle_request;