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

function AppSidebar() {

  const sideBarItems = [
    {
      label: "Dashboard",
      route: "/",
      icon: IoHomeOutline,
    },
    {
      label: "Categories",
      route: "/category",
      icon: BiCategoryAlt,
    },
    {
      label: "Blogs",
      route: "/blog/",
      icon: GrBlog,
    },
    {
      label: "Comments",
      route: "/get-comments",
      icon: FaRegComments,
    },
    {
      label: "Users",
      route: "/get-users",
      icon: LuUsers,
    },
  ]
  
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-xl font-semibold uppercase tracking-tighter font-serif">
          <span className="text-4xl text-red-600">Logo here</span>
        </h1>
      </SidebarHeader>
      <SidebarContent  className='bg-white'>
        <SidebarGroup>
           {
             sideBarItems.map((item, index) => (
                <Link key={index} to={item.route}>
                <SidebarMenuButton>
                  <item.icon />
                  {item.label}
                </SidebarMenuButton>
                </Link>
             ))
            }
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default AppSidebar;
