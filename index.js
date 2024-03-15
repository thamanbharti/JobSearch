const express = require("express");
const cors = require("cors");                        //To connect React Front End and Node Backend
const bodyParser = require("body-parser");           //To parse the JSON data
const dotenv = require("dotenv");                    //To configure the port
const chatRoutes = require("./routes/chatRoutes");
const app = express();
app.use(cors());  //To use cors
app.use(bodyParser.json());  //To use bodyParser

dotenv.config();

app.use("/", chatRoutes);    //Hitting localhost:3000/ After'/' everything should be taken from chatRoutes

const port = process.env.port || 8000;
app.listen(port, () => {
    console.log(`Server is running on port${port}`);
});
