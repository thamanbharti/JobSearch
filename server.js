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
app.use(cors());
app.use(morgan('dev'));

//routes 
app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/application", require("./routes/applicationRoutes"));


// const multer = require('multer');




// // Multer configuration
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "./files");
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = Date.now();
//         cb(null, uniqueSuffix + '-' + file.originalname);
//     },
// });

// const upload = multer({ storage: storage });

// // Route for uploading resumes
// app.post("/upload-files", upload.single("file"), async (req, res) => {
//     console.log(req.file);
// })
// // // module.exports = router;

app.use("/api/v1/application", require("./routes/resumeUploadRoutes"));

//port 
const PORT = 8080
//listen
app.listen(PORT, () => {
    console.log("Node server Running");
})