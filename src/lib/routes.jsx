import { createBrowserRouter } from "react-router-dom";
import Login from "../components/auth/Login.jsx";
import Register from "../components/auth/Register.jsx";
import Comments from "../components/comments/Comments.jsx";
import Layout from "../components/layout/Layout.jsx";
import Navbar from "../components/navbar/Navbar.jsx";
import Profile from "../components/profile/Profile.jsx";
import Users from "../components/users/Users.jsx";

export const ROOT = "/";
export const LOGIN ="/login"
export const REGISTER ="/register"
export const PROTECTED = '/protected'
export const NAVBAR ="/protected/navbar"
export const USERS ="/protected/users"
export const PROFILE ="/protected/profile/:id"
export const COMMENTS ="/protected/comments/:id"

export const router = createBrowserRouter([
    {path: ROOT, element: <Login/>},
    {path: LOGIN, element:<Login/>},
    {path: REGISTER, element:<Register/>},
    {
        path: PROTECTED,
        element: <Layout/>,
        children: [
            {
        path: NAVBAR,
        element:<Navbar/>,

    },
    {
        path: USERS,
        element: <Users/>,

    },
    {
        path: PROFILE,
        element:<Profile/>,

    },
    {
        path: COMMENTS,
        element:<Comments/>,

    },
],
},
])
