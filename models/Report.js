const Student = require('./Student'); 
const mongoose = require('mongoose');

// Thêm useNewUrlParser và useUnifiedTopology vào options
mongoose.connect('mongodb://0.0.0.0:27017/web', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const reportSchema = new mongoose.Schema({
    _id: {
        type : mongoose.Schema.Types.ObjectId,
        require: true
    },
    student_id: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    major: {
        type: String,
        require: true
    },
    gpa: {
        type: Number,
        require: true
    }
});
const Students = mongoose.model("Student", studentSchema);
module.exports = Students;