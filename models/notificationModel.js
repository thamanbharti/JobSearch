const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'application',
    },
    companyName:{
        type:String,
    },
    seen: {
        type: Boolean,
        default: false,
    },
    message:{
        type:String
    }
}, { timestamps: true });

module.exports = mongoose.model('notification', notificationSchema);