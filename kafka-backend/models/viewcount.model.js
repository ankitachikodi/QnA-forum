var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//mongoose.connect('mongodb://127.0.0.1:27017/cmpe_273');

var ViewcountSchema   = new Schema({
    
    answerID: { 
        type: Schema.Types.ObjectId, 
        ref: 'Answer'
    },
    userID: { 
        type: Number,
        ref: "User"
    },
    date: { 
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Viewcount', ViewcountSchema);
