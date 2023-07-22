import React, { useState, useEffect } from 'react'
import Navbar from '../../navbar/Navbar';
import axios from '../../../Axios/axios';
function NewPosts() {
    const [username, setUsername] = useState('');
    const [status, setStatus] = useState('');
    const [filedetails, setFiledetails] = useState();

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    }
    const handlePhotoChange = (e) => {
        setFiledetails(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('id');
        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Content-Type": 'multipart/form-data',
            }
        }
        const formData = {
            status: status,
            image: filedetails
        }
        axios.post(`/posts/${id}`, formData, config).then((response) => {
            alert(response.data.message);
        }).catch((err) => {
            alert(err.message);
        })

    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        }
        axios.get('/users', config).then((response) => {
            console.log(response.data);
            setUsername(response.data.username);
        }
        )
    }, []);
    return (
        <>
            <Navbar></Navbar>
            <div className="parent-container container d-flex justify-content-center align-items-center vh-100 w-100">
                <div className="child-container container mt-5 box d-flex flex-column justify-content-center align-items-center">

                    <h1>New Post of {username}</h1>
                    <form>
                        <div className="form-outline mb-4">
                            <textarea id="form2Example1" className="form-control" onChange={handleStatusChange}
                            ></textarea>
                            <label class="form-label" for="form2Example1">Status</label>
                        </div>
                        <div className="row mb-4">
                            <div className="col d-flex justify-content-center">
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="file" className="form-control" id="image" name="image" onChange={handlePhotoChange}></input>
                            <label className="form-label">Upload Photo</label>
                        </div>

                        <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Post</button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default NewPosts