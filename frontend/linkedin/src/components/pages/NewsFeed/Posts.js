import React from 'react';

const Post = ({ username, body, image }) => {

    return (
        <div className="post">
            <h3>{username}</h3>
            <p>{body}</p>
            {image && <img src={image} alt="Post" />}
        </div>
    );
};

export default Post;
