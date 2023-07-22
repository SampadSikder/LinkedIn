import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../Axios/axios";
import "./Login.css";
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (email && password) {
            axios.post("/login", {
                email: email,
                password: password
            }).then((response) => {
                if (response.data.message) {

                    alert(response.data.message);
                } else {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("id", response.data.id);
                    navigate(`/feed/${response.data.id}`);
                }
            })
        }
        else {
            alert("Please fill in all fields");
        }
    }
    useEffect(() => {
        localStorage.removeItem("token");
    })
    return (
        <div className="parent-container container d-flex justify-content-center align-items-center vh-100 w-100">
            <div className="child-container container mt-5 box d-flex flex-column justify-content-center align-items-center">

                <h1>Welcome to Linked In</h1>
                <form>
                    <div className="form-outline mb-4">
                        <input type="email" id="form2Example1" class="form-control" onChange={handleEmailChange} required />
                        <label class="form-label" for="form2Example1">Email address</label>
                    </div>


                    <div class="form-outline mb-4">
                        <input type="password" id="form2Example2" className="form-control" onChange={handlePasswordChange} required />
                        <label className="form-label" for="form2Example2">Password</label>
                    </div>


                    <div className="row mb-4">
                        <div className="col d-flex justify-content-center">
                        </div>
                    </div>

                    <button type="button" onClick={handleClick} className="btn btn-primary btn-block mb-4">Sign in</button>


                    <div className="text-center">
                        <p>Not a member? <Link to="/signup">Register</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login