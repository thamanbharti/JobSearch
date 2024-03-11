const mongoose = require('mongoose');
const connectDB = async () => {
    //    
    mongoose.connect(process.env.MONGO_URL, {
        //useNewUrlParser: true,
        // useUnifiedTopology: true
    })
        .then(async () => {
            console.log('Connected to MongoDB');

        })
        .catch(error => {
            console.error('Failed to connect to MongoDB:', error);
        });
}

module.exports = connectDB;