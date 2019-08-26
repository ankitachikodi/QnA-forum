var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//mongoose.connect('mongodb://127.0.0.1:27017/cmpe_273');

var CommentvoteSchema   = new Schema({
    
    // voteID: { 
    //     type: String,
    //     primaryKey: true,
    //     required: true 
    // },
    userID: { 
        type: Number,
        ref: "User",
    },
    voteType: { 
        type: String, 
    },
    subjectID: { 
        type: Schema.Types.ObjectId, 
        ref: 'Comment',
    },
    voteFor: { 
        type: String,
    },
});

module.exports = mongoose.model('Commentvote', CommentvoteSchema);
