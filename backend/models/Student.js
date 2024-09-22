const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    toeflScore: { type: Number, required: true },
    greScore: { type: Number, required: true },
    marks: {
      tenth: { type: Number, required: true },
      twelfth: { type: Number, required: true },
      graduation: { type: Number, required: true }
    },
    applications: [{
      universityId: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
      targetDegree: { type: String, required: true },
      targetCourse: { type: String, required: true },
      consultantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Consultant', required: true }
    }]
  });
    
module.exports = mongoose.model('Student', studentSchema);
