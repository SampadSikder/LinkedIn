const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const authentication = require("../middlewares/authentication");
const notifications = require("../controllers/notification-controller");
const postController = require("../controllers/post-controller");
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

router.get("/users", authentication, userController.getUser);
router.post("/register", userController.createUser);
router.post("/login", userController.login);
router.post("/posts", authentication, upload.single("image"), postController.createPost);
router.get("/notifications", authentication, notifications.getNotifications);
router.get("/posts", authentication, postController.getPosts);
router.get("/ownposts", authentication, postController.getOwnPosts);

module.exports = router;