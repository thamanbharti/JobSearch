const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    applicationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'application',
    }
}, { timestamps: true });

module.exports = mongoose.model('notification', notificationSchema);
