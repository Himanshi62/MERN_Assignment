const mongoose = require('mongoose');

const universitySchema = new mongoose.Schema({
    name: String,
    country: String,
    requiredDocuments: [String]  
});

module.exports = mongoose.model('University', universitySchema);
