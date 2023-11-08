const { Posts } = require("../models/Posts");
//const { Notifications } = require("../models/Notifications");
//const { postNotification } = require("../controllers/notification-controller");
const axios = require("axios");
const Minio = require('minio');


async function postNotification(_username) {
    const notification = "New post from " + _username;
    try {
        const response = await axios.post("http://notificationservice:3012/notifications", {
            notification: notification,
        });
        console.log(response);
    }
    catch (err) {
        console.log(err);
    }

}

const minioClient = new Minio.Client({
    endPoint: 'host.docker.internal',
    port: 9000,
    useSSL: false,
    accessKey: 'GccUSTyzbBIHuDZE9LDx',
    secretKey: 'etmTp7K7SKJf5EBQIiOSnP9fdAOSGaCZWObR6ZXH'
});

async function uploadToMinio(file) {
    const bucketName = "linked-in";
    console.log(file);
    const objectKey = Date.now() + ' ' + file.originalname;
    const metaData = {
        'Content-Type': file.mimetype,
    }


    await minioClient.fPutObject(bucketName, objectKey, file.path, metaData, (err, etag) => {
        if (err) {
            console.log(err);
            return null;
        }
    }); //bucketName, objectKey

    return objectKey;
}




async function createPost(req, res) {
    const _userId = req.user.id;
    const body = req.body.status;
    const username = req.user.username;
    let _imageId = null;

    if (req.file) {
        _imageId = await uploadToMinio(req.file);
    }
    _imageId = _imageId ? _imageId : null;
    await Posts.create({ body: body, _userId: _userId, _imageId: _imageId, _username: username });


    await postNotification(username);
    res.json({ message: "Successfully created post" });

}

async function getPosts(req, res) {
    const _userId = req.user.id;
    try {
        const allPosts = await Posts.find({ _userId: { $ne: _userId } }).lean();

        const postsWithUsername = await Promise.all(
            allPosts.map(async (post) => {
                let image = null;
                if (post._imageId != null) {
                    image = 'http://127.0.0.1:9000/linked-in/' + post._imageId;
                }

                return {
                    ...post,
                    username: post._username,
                    image,
                };
            })
        );
        res.json(postsWithUsername);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

async function getOwnPosts(req, res) {
    const _userId = req.user.id;
    try {
        const allPosts = await Posts.find({ _userId: _userId }).lean();

        const postsWithUsername = await Promise.all(
            allPosts.map(async (post) => {
                let image = null;
                if (post._imageId != null) {
                    image = 'http://127.0.0.1:9000/linked-in/' + post._imageId;
                }
                return {
                    ...post,
                    username: post._username,
                    image,
                };
            })
        );

        res.json(postsWithUsername);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    createPost,
    getPosts,
    getOwnPosts
}