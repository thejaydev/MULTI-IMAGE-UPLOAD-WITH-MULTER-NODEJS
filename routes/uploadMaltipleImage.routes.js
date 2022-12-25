"use strict"
module.exports = app => {
    const express = require("express");
    const uploadMultiImage = require("../controller/uploadImage.controller");
    let router = express.Router();

    router.post('/upload-multi-images', uploadMultiImage.uploadMultipleImage);

    app.use("/api", router);
}
