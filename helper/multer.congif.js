// pakage import
const multer = require('multer');
const md5 = require('md5');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, md5(Date.now()) + path.extname(file.originalname));
    }
})

const uploadImage = multer({
    storage: storage
});

module.exports = {
    uploadImage
}