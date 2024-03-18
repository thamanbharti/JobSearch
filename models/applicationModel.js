const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Company ID is required']
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    jobTitle: {
        type: String,
        required: [true, 'job tittle required'],
    },
    location: {
        type: String,
        require: [true, 'location required'],
    },
    eligibility: {
        type: String,
        required: [true, 'qualification required'],
    },
    requirement: {
        type: String,
        required: [true, 'skills are required']
    },
    salary: {
        type: Number,
        required: [true, 'salary is required']
    },
    description: {

        type: String,
        required: [true, 'organisation is required']
    },

}, { timestamps: true })


module.exports = mongoose.model("Application", applicationSchema);