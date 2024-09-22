const mongoose = require('mongoose');

const consultantSchema = new mongoose.Schema({
    name: String,
    type: String,  
    contactInfo: {
        mobile: String,
        email: String
    }
});

module.exports = mongoose.model('Consultant', consultantSchema);
