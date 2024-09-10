const { default: mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    userType: {
        type: String,
        required: [true, 'role is required'],
        // enum: ['Job Seeker', 'Recruiter']
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
    FirstTime:{
        type:Boolean,
    },
    Interest:{
        type:[String],
        required:[true,'Interest is required']
    },
    // userType:{
    //     type:String,
    // },
    notificationNo:{
        type:Number,
        default:0
    }
    ,About:{
         type:String,
    },
    Skill:{
        type:[String],
    }

    // phone: {
    //     type: String,
    //     required: [true, 'address is required']

    // }
}, { timestamps: true });

module.exports = mongoose.model('users', userSchema);