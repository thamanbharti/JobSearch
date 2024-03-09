const express = require('express')

//rest object
const app = express();

//routes 
app.get("/", (req, res) => {
    res.status(200).json({
        message: "welocome to job-search app",
    })
})

//port 
const PORT = 8080
//listen
app.listen(PORT, () => {
    console.log("Node server Running");
})