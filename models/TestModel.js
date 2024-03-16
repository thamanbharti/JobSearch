const {default:mongoose}=require('mongoose');


const skillTestSchema=new mongoose.Schema({
    WebDev:{
         type:[String],
    },
    AppDev:{
        type:[String],
   },
   DataAnalyst:{
    type:[String],
},
   ML:{
    type:[String],
}
})

module.exports=mongoose.model('Tests',skillTestSchema);