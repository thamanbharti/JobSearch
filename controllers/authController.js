const mongoose = require('mongoose');
const userModel = require("../models/userModel");
const companyModel=require('../models/companyModel')
const notificationModel=require('../models/notificationModel')
const { ObjectId } = mongoose.Types;
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
       
        if(req.body.userType==='Job Seeker')
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


const viewaNotificationController = async (req, res) => {
    try {
        const notificationId = req.params.notificationId;
        let notification = await notificationModel.findOne({ notificationId });
        if (notification == null) {
            notification = await resumeUploadModel.findOne({ _id: notificationId });
        }
        const user = await userModel.findOne({ _id: notification.userId });
        let application;
        if (user == 'Job Seeker') {
            if (!notification.seen) {
                await notificationModel.updateOne({ _id: notification._id, seen: false }, { $set: { seen: true } });

                user.notificationNo = user.notificationNo - 1;
                await user.save();
                application = await applicationModel.findOne({ _id: notification.applicationId });
            }
        } else {
            if (!notification.seen) {
                await resumeUploadModel.updateOne({ _id: notification._id, seen: false }, { $set: { seen: true } });

                user.notificationNo = user.notificationNo - 1;
                await user.save();
                application = await resumeUploadModel.findOne({ _id: notification.applicationId });
            }
        }

        return res.status(200).send({
            success: true,
            message: "view the notification",
            application,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: true,
            message: "error in veiw the notifciation",
            error,
        })
    }
}

//get Notifications

const getNotificationController = async (req, res) => {
    try {
        const receiverId = req.query.userId;
        // console.log(userId, "hello")
       // const user = await userModel.findOne({ _id: userId });
        // await Notification.updateMany({ receiverId: receiverId, seen: false }, { $set: { seen: true } });
        // console.log(user, "hello")
        let notifications;
        // if (user.role === 'Job Seeker') {
        notifications = await notificationModel.find({ receiverId: receiverId });
        
        // } else {
        //     notifications = await resumeUploadModel.find({ postedBy: userId })
        // }
        console.log(notifications);
        
        return res.status(200).send({
            success: true,
            message: "get all notification",
            notifications,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in getting notification",
            error,
        })
    }


}

//post Notification 


const postNotificationController = async (req, res) => {
    try {
        const {  receiverId, companyName, message } = req.body;

        // Validate input
        if ( !receiverId || !companyName || !message) {
            return res.status(400).send({
                success: false,
                message: "All fields are required: senderId, receiverId, companyName, and message."
            });
        }

        // Create a new notification
        const newNotification = new notificationModel({
            
            receiverId,
            companyName,
            message,
        });

        // Save notification to the database
        await newNotification.save();

        return res.status(201).send({
            success: true,
            message: "Notification sent successfully",
            notification: newNotification
        });

    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Failed to send notification",
            error: error.message
        });
    }
};




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

const clientController =async (req,res)=>{
    try {
        
        const userId=req.query.userId;
        
        // const userObjectId = ObjectId(userId);
        const user = await userModel.findOne({ _id:userId });
        console.log(userId)
        
        if (user) {
            return res.status(200).send({
                success: true,
                message: "User Fetched Successfully",
                userData: user
            });
        } 
         else {
            return res.status(404).send({
                success: false,
                message: "User"
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
}

const currentUserController = async (req, res) => {
    try {
        
        const { userId } = req.body;
        
        // const userObjectId = ObjectId(userId);
        const user = await userModel.findOne({ _id:userId });
        const company = await companyModel.findOne({ _id: userId  });
        
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

// const updateCurrentUserController=async (req,res)=>{
//     try{
//           const userId=req.params.userId;
//           const interest=req.body;
//           console.log(interest)
//          const updatedData =await userModel.findByIdAndUpdate(userId,{FirstTime:false,Interest:interest.Interest});
//          console.log(updatedData)
//           return res.status(200).send({
//             success: true,
//             message:"FirstTime Login Updated"
            
//           })
//     } catch(error){
//         console.log(error)
//         return res.status(500).send({
//             success: false,
//             message: "unable to get current user",
//             error
//         })
//     }
// }

const updateCurrentUserController = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { Interest, About ,Recruiter} = req.body;
        console.log(Recruiter)
        // Find user and update their fields
        if (Recruiter){

            const updatedData = await companyModel.findByIdAndUpdate(
                userId,
                {
                  About: About || undefined
                },
                { new: true } // This option returns the modified document rather than the original.
            );
            if (!updatedData) {
                return res.status(404).send({
                    success: false,
                    message: "User not found"
                });
            }
    
            return res.status(200).send({
                success: true,
                message: "User updated successfully",
                data: updatedData
            });
            
        }
        const updatedData = await userModel.findByIdAndUpdate(
            userId,
            {
                FirstTime: false,
                Interest: Interest || undefined,
                About: About || undefined
            },
            { new: true } // This option returns the modified document rather than the original.
        );

        if (!updatedData) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).send({
            success: true,
            message: "User updated successfully",
            data: updatedData
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Unable to update user",
            error
        });
    }
};

module.exports = { registerController, loginController, currentUserController,updateCurrentUserController,getNotificationController,viewaNotificationController ,postNotificationController,clientController};