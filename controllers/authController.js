const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const interestModel = require("../models/interestModel");
const registerController = async (req, res) => {
    try {
        const exisitingUser = await userModel.findOne({ email: req.body.email })
        //validation
        console.log(req.body.email);
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: 'user Already exists'
            })
        }
        //hash password
        console.log('req.body.password:', req.body.password);
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword
        //rest data
        const user = new userModel(req.body)
        await user.save();
        return res.status(201).send({
            success: true,
            message: 'user Registered Succesfully',
            user,
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "errors in register API",
            error,
        })
    }
}
//store the interest of user

const interestController = async (req, res) => {
    try {

        const interest = new interestModel(req.body)
        await interest.save();
        return res.status(201).send({
            success: true,
            message: 'users interst store  Succesfully',

        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "errors in interst API",
            error,
        })
    }
}

// login call back 
const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            console.log("NO");
            return res.status(404).send({
                success: false,
                message: 'Invalid Credential',
                userDetails: user._id

            })
        }
        //role
        // if (user.role !== req.body.role) {
        //     return res.status(500).send({
        //         success: false,
        //         message: 'role doesnt match',
        //     })
        // }
        //compare password
        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        if (!comparePassword) {
            console.log("wrong")
            return res.status(500).send({
                success: false,
                message: 'Invalid Credentials'
            })
        }
        // console.log('PORT:', process.env.PORT);
        // console.log('DEV_MODE:', process.env.DEV_MODE);
        // console.log('MONGO_URL:', process.env.MONGO_URL);
        // console.log('JWT_SECRET:', process.env.JWT_SECRET);

        //const secret = "SHUBHAMA123"
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        return res.status(200).send({
            success: true,
            message: 'Login Successfully',
            token,
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error In Login API',
            error
        })
    }
};

//get CURRENT-USER
const currentUserController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        return res.status(200).send({
            success: true,
            message: "user Feched Succesfully",
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "unable to get current user",
            error
        })
    }
};

// get resume 

module.exports = { registerController, loginController, currentUserController, interestController };