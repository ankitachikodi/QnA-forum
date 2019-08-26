var Topic = require('../models/Topic.model');
var TopicFollow = require('../models/TopicFollow.model');
var db = require('../config/db');


const handle_request = (msg, callback) => {
    TopicFollow.find({user: msg.userid}).then(res => {
        Topic.find({}).then(resp => {
            let response = [];
            resp.map(v => {
                let followed = res.filter(v1 => {
                    return v1.topic.equals(v._id);
                }).length > 0;
                response.push({
                    _id: v._id,
                    topicName: v.topicName,
                    followed: followed
                })
            })
            callback(null,response);
        }).catch(error => {
            callback(error, error);
        })
    })
}

exports.handle_request = handle_request;