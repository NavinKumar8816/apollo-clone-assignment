const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialty: String,
  experience: Number,
  qualification: String,
  city: String,
  fee: Number,
  imageUrl: String,
});

module.exports = mongoose.model('Doctor', doctorSchema);
