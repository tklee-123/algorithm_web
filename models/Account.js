const Student = require('./Student');
const mongoose = require('mongoose');

// Thêm useNewUrlParser và useUnifiedTopology vào options
mongoose.connect('mongodb://0.0.0.0:27017/web', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const accountSchema = new mongoose.Schema({
    _id: {
        type: String,
        ref: Student,
        require: true
    },
    pass: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    }
});
const Accounts = mongoose.model("Account", accountSchema);
module.exports = Accounts;