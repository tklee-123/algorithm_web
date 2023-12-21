const mongoose = require('mongoose');
const Student = require('./Student');
const Position = require('./Position');

mongoose.connect('mongodb://0.0.0.0:27017/web', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


const promiseSchema = new mongoose.Schema({
    _id: {
        type: String,
        ref: 'Student',
        required: true,
    },
    promised_positions: [{
        _id: {
            type: String, // Set the type to String
            ref: 'Position',
            required: true,
        }
    }]
    // Other properties of the promise schema
});

const Promises = mongoose.model("Promise", promiseSchema);
module.exports = Promises;