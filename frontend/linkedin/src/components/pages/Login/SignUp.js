import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import axios from "../../../Axios/axios";
function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const isPasswordMatch = () => {
        setPasswordsMatch(password === confirmPassword);
        return password === confirmPassword;
    };

    const handleClick = (e) => {
        e.preventDefault();
        if (!email || !password || !confirmPassword || !username) {
            alert("Please fill in all fields");
            return;
        }
        if (isPasswordMatch()) {
            const data = {
                email: email,
                password: password,
                username: username
            }
            axios.post('/register', data)
                .then((response) => {
                    if (response.data.message) {
                        alert(response.data.message);
                        navigate('/');
                    } else {
                        alert("Failed to register");

                    }
                })
                .catch((error) => {
                    alert(error)
                })
        }
    }
    return (
        <div className="parent-container container d-flex justify-content-center align-items-center vh-100 w-100">
            <div className="child-container container mt-5 box d-flex flex-column justify-content-center align-items-center">

                <h1>Sign Up To LinkedIn</h1>
                <form>
                    <div className="form-outline mb-4">
                        <input type="email" id="form2Example1" onChange={handleEmailChange} class="form-control" required />
                        <label class="form-label" for="form2Example1">Email address</label>
                    </div>


                    <div class="form-outline mb-4">
                        <input type="password" id="form2Example2" onChange={handlePasswordChange} className="form-control" required />
                        <label className="form-label" for="form2Example2">Password</label>
                    </div>

                    <div class="form-outline mb-4">
                        <input type="password" id="form2Example2" onChange={handleConfirmPasswordChange} className="form-control" required />
                        <label className="form-label" for="form2Example2">Confirm Password</label>
                    </div>
                    <div class="form-outline mb-4">
                        <input type="test" id="form2Example3" onChange={handleUsernameChange} className="form-control" required />
                        <label className="form-label" for="form2Example3">Unique Username</label>
                    </div>

                    {!passwordsMatch && (
                        <span className="text-danger">Passwords do not match</span>
                    )}


                    <div className="row mb-4">
                        <div className="col d-flex justify-content-center">
                        </div>
                    </div>

                    <button type="button" onClick={handleClick} className="btn btn-primary btn-block mb-4">Sign Up</button>

                </form>
            </div>
        </div>
    )
}

export default SignUp