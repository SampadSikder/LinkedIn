import React, { useState, useEffect } from 'react'
import "./Feed.css";
import Navbar from "../../navbar/Navbar";
import Posts from "./Posts";
import axios from "../../../Axios/axios";
function Feed() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        axios.get(`/posts/${id}`, config).then((response) => {
            setPosts(response.data.reverse());
        }).catch((error) => {
            console.log(error);
        });
    }
        , [])
    return (

        <div>
            <Navbar></Navbar>
            <div className="feed">
                {posts.map((post) => (
                    <Posts
                        key={post.id}
                        username={post.username}
                        body={post.body}
                        image={post.image}
                    />
                ))}
            </div>
        </div>
    )
}

export default Feed