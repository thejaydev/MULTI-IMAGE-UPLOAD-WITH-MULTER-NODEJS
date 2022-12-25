// imports
const { uploadImage } = require('../helper/multer.congif');

exports.uploadMultipleImage = async (req, res) => {
    const uploadMultiImage = uploadImage.array('image', 5)
    //this function only accept 5 image

    uploadMultiImage(req, res, async (err) => {
        if (err) {
            res.status(400).send({
                success: false,
                message: err.message || "Some Error Occured",
                data: null
            })
        } else if (!req.files) {
            res.status(400).send({
                success: false,
                message: "Please Select Image",
                data: null
            })
        } else {
            let Urls = [];

            for (i = 0; i < req.files.length; i++) {
                Urls[i] = process.env.WEB_URL + "uploads/" + req.files[i].filename;
            }

            res.status(200).send({
                success: true,
                message: "Image Uploaded successfully",
                data: Urls
            })
        }
    })
}