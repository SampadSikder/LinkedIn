import React, { useState, useEffect } from 'react'
import "./Feed.css";
import Navbar from "../../navbar/Navbar";
import Posts from "./Posts";
import axios from "../../../Axios/axios";
function Profile() {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        axios.get(`/ownposts/${id}`, config).then((response) => {
            console.log(response.data.reverse());
            setPosts(response.data);
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

export default Profile