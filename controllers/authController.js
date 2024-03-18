const userModel = require("../models/userModel");
const companyModel=require('../models/companyModel')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const FavouriteModel = require("../models/FavouriteModel");
const registerController = async (req, res) => {
    try {
        const exisitingUser = await userModel.findOne({ email: req.body.email })
        const exisitingCompany=await companyModel.findOne({ email: req.body.email })
        console.log(req.body.email);
        if (exisitingUser||exisitingCompany) {
            return res.status(200).send({
                success: false,
                message: 'user Already exists'
            })
        }
      
        console.log('req.body.password:', req.body.password);
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword
       
        if(req.body.userType==='job Seeker')
        {
            const user = new userModel(req.body)
            await user.save();
            return res.status(201).send({
                success: true,
                message: 'user Registered Succesfully',
                user,
            })
        }
        else
        {
            const company=new companyModel(req.body)
            await company.save();
            return res.status(201).send({
                success: true,
                message: 'user Registered Succesfully',
                company,
            })
        }
        
        
        
       
        

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "errors in register API",
            error,
        })
    }
}


const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        const company = await companyModel.findOne({ email: req.body.email });

        if (!user && !company) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        let entity;
        if (user) {
            entity = user;
        } else {
            entity = company;
        }

        const comparePassword = await bcrypt.compare(req.body.password, entity.password);
        if (!comparePassword) {
            return res.status(401).send({
                success: false,
                message: 'Invalid Credentials'
            });
        }

        const token = jwt.sign({ userId: entity._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(200).send({
            success: true,
            message: 'Login Successful',
            token,
            user: entity,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in Login API',
            error
        });
    }
};


//get CURRENT-USER
const currentUserController = async (req, res) => {
    try {
        console.log(req.body)
 
        const user = await userModel.findOne({ _id: req.body.userId });
        const company = await companyModel.findOne({ _id: req.body.userId });
        
        if (user) {
            return res.status(200).send({
                success: true,
                message: "User Fetched Successfully",
                userData: user
            });
        } else if (company) {
            return res.status(200).send({
                success: true,
                message: "Company Fetched Successfully",
                userData: company
            });
        } else {
            return res.status(404).send({
                success: false,
                message: "User or Company not found"
            });
        }
        
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "unable to get current user",
            error
        })
    }
};

const updateCurrentUserController=async (req,res)=>{
    try{
          const userId=req.params.userId;
          const interest=req.body;
          console.log(interest)
         const updatedData =await userModel.findByIdAndUpdate(userId,{FirstTime:false,Interest:interest.Interest});
         console.log(updatedData)
          return res.status(200).send({
            success: true,
            message:"FirstTime Login Updated"
            
          })
    } catch(error){
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "unable to get current user",
            error
        })
    }
}

module.exports = { registerController, loginController, currentUserController,updateCurrentUserController };