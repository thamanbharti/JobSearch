const {default:mongoose}=require('mongoose');

const FavouriteSchema=new mongoose.Schema(({
    
    companyName: {
        type: String,
    },
    user_id: {
        type: String,
    }
}))

module.exports=mongoose.model('favourites',FavouriteSchema);