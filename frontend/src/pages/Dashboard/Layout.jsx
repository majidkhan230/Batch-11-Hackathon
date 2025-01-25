import AppSidebar from "@/components/AppSidebar";
import Footer from "@/components/Footer";
import Topbar from "@/components/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <SidebarProvider>
      
      <AppSidebar />
      <Topbar />
      {/* <SidebarTrigger /> */}
      <main className=" w-full">
        <div className="w-full min-h-[calc(100vh-40px)] py-20 px-10"><Outlet/>
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  );
}

export default Layout;
