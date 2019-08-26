const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topicSchema = mongoose.Schema({
    topicName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Topic", topicSchema);