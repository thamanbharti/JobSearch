const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    applyBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    postBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    applicationIdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'applications',
    },
    resume: {
        type: String,
        required: true, // Change 'require' to 'required'
    }
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
