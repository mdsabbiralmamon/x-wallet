import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import PrivateRoute from "./PrivateRoute";
import SignUpUser from "../pages/SignUp/SignUpUser";
import SignUpAgent from "../pages/SignUp/SignUpAgent";
import InitialSignIn from "../pages/SignIn/InitialSignIn";
import InitialSignUp from "../pages/SignUp/InitialSignUp";
import SignInUser from "../pages/SignIn/SignInUser";
import SignInAgent from "../pages/SignIn/SignInAgent";

const Routes = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute><App /></PrivateRoute>,
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
        path: "/signin/agent",
        element: <SignInAgent />,
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

