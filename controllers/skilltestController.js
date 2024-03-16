const skillTestModel=require('../models/TestModel')

const skillTestController=async (req,res)=>{
    
    try{
        const skill=req.params.skill;
        console.log(skill)
        const skillTest= await skillTestModel.find({$or:[{ML:skill},{DataAnalyst:skill},{AppDev:skill},{WebDev:skill}]});
        return res.status(200).send({
              success:true,
              message:"skill found according to req",
              skillTest,
        })

    }
    catch(err){
         return res.status(500).send({
            success:false,
            message:"err in finding data",
            err
         })
    }
}

module.exports=skillTestController;