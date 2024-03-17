const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    is_online:{
        type: String,
        default:'0'         //0 means offline and 1 means user is online
    }
},
    {
        timestamps:true
    }
)
module.exports=mongoose.model('User', userSchema);