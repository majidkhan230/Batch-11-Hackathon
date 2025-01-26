import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { MdLogin, MdLogout } from "react-icons/md";
import SearchBox from "./SearchBox";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dummyAvatar from "/assets/images/user-icon.png";
import { CgProfile } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa6";
import { GrAdd } from "react-icons/gr";
import { getReq } from "@/api";
import { showToast } from "@/helpers/showToast";
import { removeUser } from "@/store/features/userSlice";
import { SidebarTrigger } from "./ui/sidebar";
import logo from '/assets/images/logo.png'

function Topbar() {
  const user = useSelector((state) => state.user);
  // console.log(user)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await getReq("/auth/logout");

      showToast("sucess", res?.messsage);
      dispatch(removeUser());
      if (res) {
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-full h-16 border-b bg-white fixed z-20 flex justify-between items-center px-10 ">
      <SidebarTrigger className=" md:hidden  mr-5  absolute top-5 left-2" />
      <Link to={"/"}>
        <h1 className="text-xl font-semibold uppercase tracking-tighter font-serif">
          <img src={logo} alt="logo" width={100} />
        </h1>
      </Link>
      <div>
        <SearchBox />
      </div>
      <div>
        {!user.isLoggedIn ? (
          <Link to="/sign-in">
            <Button className="rounded-full">
              <MdLogin />
              Sign In
            </Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar
                className="border-2 border-blue-600 ring-2 ring-blue-300 ring-offset-2 
             transition-all duration-300 hover:ring-4 hover:border-blue-800 
             hover:scale-105 group"
              >
                <AvatarImage
                  src={user?.user?.avatar || dummyAvatar}
                  className="group-hover:brightness-110"
                />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <h1>{user?.user.name}</h1>
                <h1 className="text-xs">{user?.user.email}</h1>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={"/dashboard/profile"}>
                  <FaRegUser /> Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout}>
                <MdLogout />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default Topbar;
