var Question = require("../models/questions.model");
var Answer = require("../models/Answers.model");
var Topic = require("../models/Topic.model");
var TopicFollow = require("../models/TopicFollow.model");
var AnswerVote = require("../models/answervote.model");
var QuestionFollow = require("../models/questionFollow");
var db = require("../config/db");
var mongoose = require("mongoose");

const handle_request = (msg, callback) => {
  TopicFollow.find({ user: msg.userid }).then(resp => {
    let topics = resp.map(v => {
      return v.topic;
    });
    if (msg.topics) {
      topics = msg.topics.split(",");
    }
    Question.find({ topicID: { $in: topics } }).then(resp1 => {
      resp1.sort((a, b) => {
        return b.date - a.date;
      });
      let questions = resp1.map(q => {
        return q._id;
      });
      Answer.find({ questionID: { $in: questions } })
        .populate("questionID")
        .populate("ownerID", "firstName familyName profile credentials")
        .then(resp2 => {
          let answerids = resp2.map(answer => {
            return answer._id;
          });
          AnswerVote.find({
            subjectID: { $in: answerids },
            voteType: "true"
          }).then(votes => {
            let counts = votes.reduce((v, i) => {
              if (!v.hasOwnProperty(i.subjectID)) {
                v[i.subjectID] = 0;
              }
              v[i.subjectID]++;
              return v;
            }, {});
            resp2.forEach(answer => {
              if (answer.anonymousFlag) {
                answer.ownerID = null;
              }
              answer.answer = answer.answer.substr(0, 345);
              answer.votes = counts[answer._id];
            });
            resp2.sort((a, b) => {
              let sort = 1;
              if (a.votes === b.votes) {
                if (a.date > b.date) sort = -1;
                else sort = 1;
              } else {
                sort = a.votes === undefined ? -1 : a.votes < b.votes ? 1 : -1;
              }
              return sort;
            });
            let answers = resp2.reduce((p, c) => {
              if (
                p.filter(v => {
                  return v.questionID._id === c.questionID._id;
                }).length === 0
              ) {
                p.push(c);
              }
              return p;
            }, []);
            QuestionFollow.find({ questionID: { $in: questions } }).then(
              qfollows => {
                let fcounts = qfollows.reduce((v, i) => {
                  if (!v.hasOwnProperty(i.questionID)) {
                    v[i.questionID] = 0;
                  }
                  v[i.questionID]++;
                  return v;
                }, {});
                let questions = resp1.filter(q => {
                  let answers = resp2.filter(a => {
                    return a.questionID._id.toString() === q._id.toString();
                  });
                  return answers.length === 0;
                });
                questions.forEach(v => {
                  v.follows = fcounts[v._id];
                  if (
                    qfollows.filter(qf => {
                      return (
                        qf.userID === msg.userid &&
                        qf.questionID.toString() === v._id.toString()
                      );
                    }).length > 0
                  ) {
                    v.followed = true;
                  }
                });
                callback(null, { questions: questions, answers: answers });
              }
            );
          });
        });
    });
  });
};

exports.handle_request = handle_request;
