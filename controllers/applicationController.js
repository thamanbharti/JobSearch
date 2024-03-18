const userModel = require("../models/userModel");
const applicationModel = require("../models/applicationModel");
const resumeUploadModel = require("../models/resumeUploadModel");
const companyModel = require("../models/companyModel");


const createApplicationController = async (req, res) => {
    try {
        const { postedBy } = req.body;
            console.log(req.body)
       
        // console.log(email)
        const user = await companyModel.findOne({ _id:postedBy })
        console.log(user);
        if (!user) {
            throw new Error('User NOt Found');
        }
        if (user.role === 'Job Seeker') {
            throw new Error('Not a Employer account');
        }
        
        req.body.postedBy = user._id;
        
        const application = new applicationModel(req.body)
        await application.save()
        return res.status(201).send({
            success: true,
            message: 'New Application Added'
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error IN create API',
            error
        })
    }
};

//get all Application records
const getApplicationController = async (req, res) => {
    try {
        const application = await applicationModel.find();
        return res.status(200).send({
            success: true,
            message: "get all records succesfully",
            totalJobs: application.length,
            application,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error In Get All Application',
            error
        })
    }
}

//get filter 
const getFilterControlle = async (req, res) => {
    try {
        let query = {};
        if (req.query.companyName) {
            //  query.companyName = req.query.companyName;
            query.companyName = { $regex: search, $options: "i" }
        }
        if (req.query.requirement) {
            query.requirement = req.query.requirement;
        }
        if (req.query.jobTittle) {
            query.jobTittle = req.query.jobTittle;
        }
        if (req.query.eligibility) {
            query.eligibility = req.query.eligibility;
        }
        if (req.query.location) {
            query.location = req.query.location;
        }
        if (req.query.salary) {
            query.salary = req.query.salary;
        }

        console.log(query);


        const applications = await applicationModel.find(query).sort({ createdAt: -1 });
        return res.status(200).send({
            success: true,
            message: "get all filtered succesfully",
            applications,
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
const getResume = async (req, res) => {
    try {
        // const post_id = "65ef51f27e3f0253e0655164";
        const post_id = req.params.postedBy;
        console.log(post_id)
        const resumeDetail = await resumeUploadModel.find({ postBy: post_id });
        // console.log(resumeDetail)
        return res.status(200).send({
            success: true,
            message: "get all filtered succesfully",
            resumeDetail,
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: "failed to fetch data",
            error,
        })
    }
}

module.exports = {
    createApplicationController, getApplicationController, getFilterControlle, getResume
}