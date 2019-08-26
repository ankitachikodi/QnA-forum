var User = require('../models/User.model');
var db = require('../config/db');



const handle_request = (msg, callback) => {
    const user = new User({
        _id: msg.userid,
        firstName: msg.firstName,
        middleName: msg.middleName,
        familyName: msg.familyName,
        userName: msg.userName,
        email: msg.email,
        city: msg.city,
        state: msg.state,
        zip: msg.zip,
        profile: msg.profile,
        education: msg.education,
        career: msg.career,
        bio: msg.bio,
        credentials: msg.credentials
    });
    console.log(user);

    user.save().then(result => {
        callback(null, result);
    })
    .catch(err => {
        callback(null, err);
    })
}

exports.handle_request = handle_request;