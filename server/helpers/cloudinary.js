const cloudinary = require("cloudinary").v2;
const multer = require("multer");

cloudinary.config({
    cloud_name:"dy9ywfkmt",
    api_key:"151988188837722",
    api_secret:"Rc6qMeVWwDLaFGdfs1pFcPBqb3k"
});

const storage = new multer.memoryStorage();

async function imageUploadUtils (file) {
    const result = await cloudinary.uploader.upload(file,{
        resource_type:"auto"
    });
    return result;
}

const upload = multer({storage});

module.exports = {upload,imageUploadUtils};