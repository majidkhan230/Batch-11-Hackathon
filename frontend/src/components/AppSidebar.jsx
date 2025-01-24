import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { BiCategoryAlt } from "react-icons/bi";
import { GrBlog } from "react-icons/gr";
import { FaRegComments } from "react-icons/fa6";
import { LuUsers } from "react-icons/lu";
import { GoDot } from "react-icons/go";
import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import Loading from "./Loading";
import SkeletonLoader from "./SkeletonLoader";

function AppSidebar() {
  const { data: categoryData, loading, error } = useFetch(`/category/all-category`)
// console.log(categoryData)
  
  return (
    <Sidebar>
      <SidebarHeader>
        {/* <img src="/assets/images/logo.png" className="w-12"  /> */}
        <h1 className="text-xl font-semibold uppercase tracking-tighter font-serif">
          <span className="text-4xl text-red-600">B</span>log
        </h1>
      </SidebarHeader>
      <SidebarContent  className='bg-white'>
        <SidebarGroup>
            {/* <SidebarGroupLabel>Hello</SidebarGroupLabel> */}
            <Link to="/">
            <SidebarMenuButton>
              <IoHomeOutline />
              Home
            </SidebarMenuButton>
              </Link>
              <Link to="/category">
            <SidebarMenuButton>
              <BiCategoryAlt/>
             Categories
            </SidebarMenuButton>
             </Link>
              <Link to="/blog/">
            <SidebarMenuButton>
              <GrBlog/>
              Blogs
            </SidebarMenuButton>
              </Link>
              <Link to="get-comments">
            <SidebarMenuButton>
              <FaRegComments/>
              Comments
            </SidebarMenuButton>
              </Link>
              <Link to="get-users">
            <SidebarMenuButton>
              <LuUsers/>
              Users
            </SidebarMenuButton>
              </Link>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
         {
          loading ? <SkeletonLoader/> 
          :
            categoryData && categoryData?.categories.length > 0 && categoryData?.categories.map((category) => 
            <Link key={category._id} to={`/blog/${category?.slug}`}>
              <SidebarMenuButton>
            <GoDot />
            {category.name}
            </SidebarMenuButton>
            </Link>
                        )          
         }
         
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
