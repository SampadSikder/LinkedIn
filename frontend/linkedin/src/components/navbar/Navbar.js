import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Notifications from '../notification/Notifications';
function Navbar() {
    const navigate = useNavigate();
    const goToHome = (event) => {
        event.preventDefault();
        const id = localStorage.getItem('id');
        navigate(`/feed/${id}`);
    }
    const goToNewPost = (event) => {
        event.preventDefault();
        const id = localStorage.getItem('id');
        navigate(`/newpost/${id}`);
    }
    const goToProfile = (event) => {
        event.preventDefault();
        const id = localStorage.getItem('id');
        navigate(`/profile/${id}`);
    }
    const handleSignOut = (event) => {
        event.preventDefault();
        navigate('/');
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href=".">LinkedIn</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" onClick={goToHome}>Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" onClick={goToProfile}>Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" onClick={goToNewPost}>New Post</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Popup trigger={<a className="nav-link">
                            Notifications
                        </a>}
                            position="bottom center">
                            <Notifications />
                        </Popup>
                    </li>
                </ul>
            </div>
            <button className="btn btn-outline-primary ml-auto" onClick={handleSignOut}>Sign Out</button>
        </nav>
    )
}

export default Navbar