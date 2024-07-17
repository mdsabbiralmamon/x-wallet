import { createBrowserRouter, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import SignUpUser from "../pages/SignUp/SignUpUser";
import SignUpAgent from "../pages/SignUp/SignUpAgent";
import InitialSignIn from "../pages/SignIn/InitialSignIn";
import InitialSignUp from "../pages/SignUp/InitialSignUp";
import SignInUser from "../pages/SignIn/SignInUser";
import Dashboard from "../pages/Dashboard/Dashboard";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><Navigate to="/dashboard" replace /></PrivateRoute>,
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
    },
    {
        path: "/signin",
        element: <InitialSignIn />,
    },
    {
        path: "/signin/user",
        element: <SignInUser />,
    },
    {
        path: "/signup",
        element: <InitialSignUp />,
    },
    {
        path: "/signup/user",
        element: <SignUpUser />,
    },
    {
        path: "signup/agent",
        element: <SignUpAgent />
    }
]);

export default Routes;

