var SHA256 = require("crypto-js/sha256");
const mv = require('mv');
const path = require('path')
const multer  = require('multer')

// require("../../public/uploads");

// We need to tell multer where we want to upload images and by what name should the file be saved.
multer.diskStorage({
    // Destination to store image     
    destination: 'public/uploads/images', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
    }
});

exports.uploadService = (req, res) => {
    let tempFile = req.files.upload;
    let temPathFile = tempFile.path;
    let targetPathUrl = "public/uploads/images/" + SHA256(req.files.upload.name) + '-' + Date.now() + path.extname(tempFile.originalFilename).toLocaleLowerCase();

    if(path.extname(tempFile.originalFilename).toLocaleLowerCase() === '.png'|| '.jpg'){
        mv(temPathFile, targetPathUrl, error => {
            if(error){
                return res.status(400).send({status: false, message: error});
            }else{
                res.status(200).json({
                    uploaded:true,
                    message: 'File has been Uploaded successfully!',
                    url: `uploads/${targetPathUrl}`
                })
            }
        });
    }
}