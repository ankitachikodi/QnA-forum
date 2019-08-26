var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

//mongoose.connect('mongodb://127.0.0.1:27017/cmpe_273');

var MessageSchema   = new Schema({
    
    messageID: { 
        type: Schema.Types.ObjectId, 
        required: true 
    },
    senderID: { 
        type: Schema.Types.ObjectId, 
        required: true 
    },
    message: { 
        type: String, 
        required: true 
    },
    receiverID: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    }
});

module.exports = mongoose.model('Message', MessageSchema);
