const { default: mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    // role: {
    //     type: String,
    //     required: [true, 'role is required'],
    //     enum: ['Job Seeker', 'Employer']
    // },
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
    // phone: {
    //     type: String,
    //     required: [true, 'address is required']

    // }
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);