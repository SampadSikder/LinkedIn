const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    _imageId: {
        type: String,
        required: false
    },
    _username: {
        type: String,
        required: true
    }
})

const Posts = mongoose.model('Posts', PostSchema);

module.exports = { Posts }