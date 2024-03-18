const { default: mongoose } = require("mongoose")

const companySchema = new mongoose.Schema({
    userType: {
        type: String,
        required: [true, 'role is required'],
        enum: ['Job Seeker', 'Recruiter']
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true

    },
    password: {
        type: String,
        required: [true, 'password is required']
    },

}, { timestamps: true });

module.exports = mongoose.model('company', companySchema);