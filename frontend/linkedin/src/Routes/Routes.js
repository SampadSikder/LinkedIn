import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from "../layouts/Main";
import Login from "../components/pages/Login/Login";
import Signup from "../components/pages/Login/SignUp";
import Feed from "../components/pages/NewsFeed/Feed";
import NewPosts from "../components/pages/Posts/NewPosts";
import Profile from "../components/pages/NewsFeed/Profile";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Login></Login>
            },
            {
                path: "/signup",
                element: <Signup></Signup>
            },
            {
                path: "/feed/:id",
                element: <Feed></Feed>
            },
            {
                path: "newpost/:id",
                element: <NewPosts></NewPosts>
            },
            {
                path: "profile/:id",
                element: <Profile></Profile>
            }
        ]
    }
])