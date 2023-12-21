const mongoose = require('mongoose');

// Thêm useNewUrlParser và useUnifiedTopology vào options
mongoose.connect('mongodb://0.0.0.0:27017/web', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const positionSchema = new mongoose.Schema({
    _id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    capacity: {
        type: Number,
        require: true
    },
    gpa_required: {
        type: Number,
        require: true
    }
});

const Positions = mongoose.model("Position", positionSchema);

module.exports = Positions;