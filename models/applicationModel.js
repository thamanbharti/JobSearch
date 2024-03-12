const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: [true, 'Company ID is required']
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        //  required: [true, 'Company ID is required']
    },
    jobTittle: {
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
        //  enum: ['B.tech', 'MBA', 'BCA', 'M.tech', 'MCA']
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