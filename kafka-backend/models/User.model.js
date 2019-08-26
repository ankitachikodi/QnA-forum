var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: false
    },
    familyName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: false
    },
    education: {
        type: String,
        required: false
    },
    career: {
        type: String,
        required: false
    },
    bio: {
        type: String,
        required: false
    },
    credentials: {
        type: String,
        required: false
    }

});

module.exports = mongoose.model('User', UserSchema);