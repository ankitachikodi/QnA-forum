var User = require('../models/User.model');
var db = require('../config/db');
var Viewcount = require('../models/viewcount.model');



const handle_request = (msg, callback) => {
    const newView = new Viewcount({
        userID: msg.userid
      });
    newView
      .save() //insert new view count of profile
      .then(result => {
        User.findOne({_id: msg.userid})
            .then(resp => {
                callback(null, resp);
            })
            .catch(error => {
                callback(null,error);
            })
      })

}

exports.handle_request = handle_request;