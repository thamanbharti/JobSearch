const resumeUploadModel = require("../models/resumeUploadModel");
const uploadOnCloudnary = require("../utils/cloudnary");


// apply for job or  resume upload  
exports.uploadFile = async (req, res) => {
    try {


        console.log(req.file.path);
        console.log(req.body.userId)
        console.log(req.body.index)
        let applyName=req.body.applyName;
        const fileUrl = await uploadOnCloudnary(req.file.path);
        console.log("hello", fileUrl);
        const application = new resumeUploadModel({ applyBy: req.body.applyBy, applicationIdBy: req.body.applicationIdBy, postBy: req.body.postedBy, resume: fileUrl,applyName:req.body.applyName })
        await application.save()
        return res.status(201).send({
            success: true,
            message: 'New Application Added',
              applyName
        })
    } catch (error) {
        // You can add further processing here
        console.log(error)
        res.send('failed');
    }
};

// all get job list 
