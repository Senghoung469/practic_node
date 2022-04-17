var SHA256 = require("crypto-js/sha256");
const mv = require('mv');
const fs = require('fs');
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

const uploadService = (file) => {
    let tempFile = file;
    let temPathFile = tempFile.path;
    let fileName = SHA256(file.name) + '-' + Date.now() + path.extname(tempFile.originalFilename).toLocaleLowerCase();
    let targetPathUrl = "public/uploads/images/" + fileName;
    if(path.extname(tempFile.originalFilename).toLocaleLowerCase() === '.png'|| '.jpg'){
        mv(temPathFile, targetPathUrl, error => {
            if(error){
                return ({status: false, message: error});
            }
        });
    }
    return fileName;
}

const destroyFileService = (url) => {
    let targetPathUrl = "public/uploads/images/" + url;
    console.log(targetPathUrl);
    // return
    fs.unlink(targetPathUrl, (error) => {
        if(error) throw error;
        console.log("file deleted");
    });
}

module.exports.uploadService = uploadService;
module.exports.destroyFileService = destroyFileService;
