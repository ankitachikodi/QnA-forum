var User = require('../models/User.model');
var db = require('../config/db');



const handle_request = (msg, callback) => {
    const opt = {
      firstName: msg.firstName,
      middleName: msg.middleName,
      familyName: msg.familyName,
      email: msg.email,
      city: msg.city,
      state: msg.state,
      zip: msg.zip,
      profile: msg.profile,
      education: msg.education,
      career: msg.career,
      bio: msg.bio,
      credentials: msg.credentials
    };
    console.log('options',opt);
    User.update({ _id: msg.userid }, { "$set": opt} )
    .then(resp => {
        callback(null, resp);
    })
    .catch(error => {
        callback(null, error);
    })
}

exports.handle_request = handle_request;