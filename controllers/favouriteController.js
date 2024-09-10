const FavouriteModel = require("../models/FavouriteModel");

const postFavouriteController=async (req,res)=>{
    try {
        console.log(req.body)
    const Favourites = new  FavouriteModel({user_id:req.body.user_id,companyName:req.body.companyName})
    await Favourites.save();
    return res.status(201).send({
        success: true,
        message: 'Favorites Registered Succesfully',
        Favourites,
    })
    } catch (error) {
        return res.status(201).send({
            success: false,
            message: 'error in favourite post',
            error,
        })
    }
    

}


const FavouriteController=async (req,res)=>{
    try{
          const userId=req.params.userId;
          const FavouriteItem= await FavouriteModel.find({user_id:userId});
          return res.status(200).send({
            success: true,
            message: "Favourites Fetched Succesfully",
            FavouriteItem
        })
    }
    catch(error){
        
        return res.status(500).send({
            success: false,
            message: "unable to get Favourites",
            error
        })
    }
}




module.exports={FavouriteController,postFavouriteController};