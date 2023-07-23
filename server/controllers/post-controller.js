const { Posts } = require("../models/Posts");
const { Users } = require("../models/Users");
const { Notifications } = require("../models/Notifications");
const Minio = require('minio');


const minioClient = new Minio.Client({
    endPoint: '127.0.0.1',
    port: 9000,
    useSSL: false,
    accessKey: 'x6yve3ySG5ntN4lH78Dq',
    secretKey: '5sPgT2AXZJjJo89qQHhJzoNmT5TkPVO6cgWGesJn'
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

const getImageFromMinio = (imageId) => {
    return new Promise((resolve, reject) => {
        minioClient.getObject('linked-in', imageId, (err, dataStream) => {
            if (err) {
                // Handle any error when fetching the image from MinIO
                reject(err);
            } else {
                const chunks = [];
                dataStream.on('data', (chunk) => {
                    chunks.push(chunk);
                });

                dataStream.on('end', () => {
                    // Concatenate the binary chunks and resolve with the image data
                    const imageData = Buffer.concat(chunks);
                    resolve(imageData);
                });

                dataStream.on('error', (err) => {
                    reject(err);
                });
            }
        });
    });
};


async function createPost(req, res) {
    const _userId = req.user.id;
    const body = req.body.status;
    console.log(req.body);

    try {
        let _imageId = null;

        if (req.file) {
            _imageId = await uploadToMinio(req.file);
        }
        _imageId = _imageId ? _imageId : null;
        await Posts.create({ body: body, _userId: _userId, _imageId: _imageId });
        const user = Users.findById(req.params.id);
        console.log(user);
        await Notifications.create({ notification: "New post from " + user.username });
        res.json({ message: "Successfully created post" });
    } catch (err) {
        res.json({ error: err.message });
    }
}

async function getPosts(req, res) {
    const _userId = req.user.id;
    try {
        const allPosts = await Posts.find({ _userId: { $ne: _userId } }).lean();

        const postsWithUsername = await Promise.all(
            allPosts.map(async (post) => {
                const user = await Users.findById(post._userId).lean();
                let image = null;
                if (post._imageId != null) {
                    image = 'http://10.100.103.162:9000/linked-in/' + post._imageId;
                }
                // const imageBuffer = post._imageId ? await getImageFromMinio(post._imageId) : null;
                // const base64String = imageBuffer ? imageBuffer.toString('base64') : null;
                // const mimeType = 'image/jpeg';
                // const image = base64String ? `data:${mimeType};base64,${base64String}` : null;

                return {
                    ...post,
                    username: user ? user.username : null,
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
                const user = await Users.findById(post._userId).lean();
                let image = null;
                if (post._imageId != null) {
                    image = 'http://10.100.103.162:9000/linked-in/' + post._imageId;
                }
                // const imageBuffer = post._imageId ? await getImageFromMinio(post._imageId) : null;
                // const base64String = imageBuffer ? imageBuffer.toString('base64') : null;
                // const mimeType = 'image/jpeg';
                // const image = base64String ? `data:${mimeType};base64,${base64String}` : null;

                return {
                    ...post,
                    username: user ? user.username : null,
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