const express = require('express');
const router = express.Router();
const postController = require("../controllers/post-controller");
const authentication = require("../middlewares/authentication");
const multer = require("multer");
const cron = require("node-cron");


const upload = multer({
    dest: './public/images', fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed!'));
        }
    },
});
router.post("/posts", authentication, upload.single("image"), postController.createPost);
router.get("/posts", authentication, postController.getPosts);
router.get("/ownposts", authentication, postController.getOwnPosts);

module.exports = router;