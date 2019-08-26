const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = mongoose.Schema({
    user: {
        type: Number,
        ref: 'User'
    },
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'Topic'
    }
});

module.exports = mongoose.model("TopicFollow", topicSchema);