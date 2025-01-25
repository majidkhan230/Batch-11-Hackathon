import Layout from "@/layout/Layout";
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

export const routes = [
    {
        path:"/",
        element:<Layout/>
        
    },
    {
        path:"/sign-in",
        element:<SignIn/>
    },
    {
        path:"/sign-up",
        element:<SignUp/>
    }
]