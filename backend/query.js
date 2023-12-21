const PromiseModel = require("../models/Promise");

PromiseModel.findOne({ _id: '21002157' }) // Use the string value directly
  .populate('_id') // Populate the student field
  .populate('promised_positions._id') // Populate the position field in promised_positions array
  .then(promise => {
    // Access information from Student and Position through the populated fields
    console.log('Thông tin về sinh viên:', promise._id);
    console.log('Danh sách vị trí đã đăng kí:');
    promise.promised_positions.forEach(position => {
      console.log('  -', position._id);
    });
  })
  .catch(err => {
    // Handle errors if needed
    console.error(err);
  });
