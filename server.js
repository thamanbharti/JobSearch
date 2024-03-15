const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')

const connectDB = require('./config/db')

//rest object
const app = express();


//dot config
dotenv.config();
//mongodb connection
connectDB();

app.use(express.json());
app.use(cors({methods: ['GET', 'PUT', 'POST']}));
app.use(morgan('dev'));

//routes 
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/auth", require("./routes/FavouriteRoute"));

//port 
const PORT = 8080
//listen
app.listen(PORT, () => {
    console.log("Node server Running");
})