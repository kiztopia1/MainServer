const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const botSchema = new Schema({
    id: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: true
    },
    command: {
        type: String,
        required: false,
    },
    response: {
        type: String,
        required: false,
    }
},{ timestamps: true})


const Bot = mongoose.model('Bot', botSchema);
module.exports = Bot;