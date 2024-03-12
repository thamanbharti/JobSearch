//const mongoose = require("mongoose");

const userModel = require("../models/userModel");
const applicationModel = require("../models/applicationModel");

//CREATE INVENTORY
const createApplicationController = async (req, res) => {
    try {
        const { email } = req.body

        //validation
        console.log(email)
        const user = await userModel.findOne({ email })
        console.log(user);
        if (!user) {
            throw new Error('User NOt Found');
        }
        if (user.role === 'Job Seeker') {
            throw new Error('Not a Employer account');
        }
        // console
        req.body.postedBy = user._id;
        //save Record
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
            message: 'Error IN create Inventory API',
            error
        })
    }
};

//get all Application records
const getApplicationController = async (req, res) => {
    try {
        const application = await applicationModel.find().sort({ createdAt: -1 });
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


module.exports = {
    createApplicationController, getApplicationController, getFilterControlle
}