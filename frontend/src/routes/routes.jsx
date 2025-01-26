import CategoriesForm from "@/components/categoriesForm";
import { loanCategories } from "@/helpers/routeHelper";
import Categories from "@/pages/Categories";
import Layout from "@/pages/Dashboard/Layout";
import Home from "@/pages/Home";
import LandingPage from "@/pages/LandingPage";
import Profile from "@/pages/Profile";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";

const generateLoanCategoryRoutes = () => {
    return loanCategories.map(category => ({
      path: category.route,
      children: category.subcategories.map(subcategory => ({
        path: subcategory.route.split('/').pop(),
        element: <CategoriesForm categories={categories} />
      }))
    }));
  };


  export const routes = [
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                path:"category",
                element:<Categories/>
            },
            ...generateLoanCategoryRoutes()
        ]
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
];