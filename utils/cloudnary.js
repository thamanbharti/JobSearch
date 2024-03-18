const v2 = require('cloudinary');
const fs = require('fs');

const cloudinary = v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadOnCloudnary(localPath) {
    console.log("hellobyyyy", localPath);
    try {
        if (!localPath) return null;

        const response = await cloudinary.uploader.upload(localPath, {

            resource_type: "auto"
        });
        // File has been uploaded successfully.

        console.log("File is uploaded on cloudinary", response.url);
        return response.url;
    } catch (error) {

        console.log(error)
        fs.unlinkSync(localPath);
        return null;
    }
}

module.exports = uploadOnCloudnary;


// cloudinary.config({
//   cloud_name: 'ddciobq4y',
//   api_key: '491196918713279',
//   api_secret: '***************************'
// });

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function(error, result) {console.log(result); });