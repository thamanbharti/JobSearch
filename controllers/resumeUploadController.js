const resumeUploadModel = require("../models/resumeUploadModel");
const uploadOnCloudnary = require("../utils/cloudnary");


// apply for job or  resume upload  
exports.uploadFile = async (req, res) => {
    try {


        console.log(req.file.path);
        console.log(req.body.userId)
        console.log(req.body.index)
        console.log(req.body.index)
        const fileUrl = await uploadOnCloudnary(req.file.path);
        console.log("hello", fileUrl);
        const application = new resumeUploadModel({ applyBy: req.body.userId, applicationIdBy: req.body.index, postBy: req.body.postedBy, resume: fileUrl })
        await application.save()
        return res.status(201).send({
            success: true,
            message: 'New Application Added'

        })
    } catch (error) {
        // You can add further processing here
        console.log(error)
        res.send('failed');
    }
};

// all get job list 
