import React from "react";
import { Button } from "../ui/button";
import { LogOut, Menu } from "lucide-react";
import { useDispatch } from "react-redux";
import {  resetTokenAndCredentials } from "@/redux/store/auth-slice";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // dispatch(logoutUser());
       dispatch(resetTokenAndCredentials());
        sessionStorage.clear();
        navigate("/auth/login");
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      <Button className="lg:hidden sm:block" onClick={() => setOpen(true)}>
        <Menu />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium shadow"
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
