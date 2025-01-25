import Layout from "@/pages/Dashboard/Layout";
import Home from "@/pages/Home";
import LandingPage from "@/pages/LandingPage";
import Profile from "@/pages/Profile";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

export const routes = [
    {
        path:"/",
        element:<LandingPage/>
        
    },
    {
        path:"/sign-in",
        element:<SignIn/>
    },
    {
        path:"/sign-up",
        element:<SignUp/>
    },
    {
        path:"/dashboard",
        element:<Layout/>,
        children:[
           {
            path:"profile",
            element: <Profile/>
           }
        ]
    }
    
]