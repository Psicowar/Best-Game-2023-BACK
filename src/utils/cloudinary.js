const cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require('../config/config').cloudinary;

cloudinary.config(cloudinaryConfig);

const uploadImage = async (imagePath) => {
    const imageUpload = await cloudinary.uploader.upload(imagePath,
        {
            resource_type: 'image',
            folder: 'gamesPictures/',
            gravity: 'east',
            height: 300,
            width: 214,
            crop: 'scale',
            overwrite: true
        })

    return imageUpload
}

module.exports = { cloudinary, uploadImage }