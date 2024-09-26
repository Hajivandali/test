// models/classModel.js
const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  professor: { type: String, required: true },
  course: { type: String, required: true },
  building: { type: String, required: true },
  days: [
    {
      day: { type: String, required: true },
      time: { type: String, required: true }
    }
  ]
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
