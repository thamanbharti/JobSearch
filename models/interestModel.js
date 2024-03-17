const mongoose = require("mongoose");

const interestSchema = new mongoose.Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    jobTitle: {
        type: String,
        required: true,
    },
    eligibility: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true, // Change 'require' to 'required'
    }
}, { timestamps: true });

module.exports = mongoose.model('interest', interestSchema);
