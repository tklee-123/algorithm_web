const mongoose = require('mongoose');

// Thêm useNewUrlParser và useUnifiedTopology vào options
mongoose.connect('mongodb://0.0.0.0:27017/web', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const teacherSchema = new mongoose.Schema({
    _id: {
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
    position: {
        type: String,
        require: true
    }
});
const Teachers = mongoose.model("Teacher", teacherSchema);
module.exports = Teachers;