import React, { useState, ReactNode, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { AuthContext } from "../authcontext";
import MenuItem from "../atoms/menuitem";

const MenuBar = () => {
  const [selectedMenu, setSelectedMenu] = useState("main");
  const authctx = useContext(AuthContext);
  const nav = useNavigate();

  return (
    <nav className="flex flex-row">
      <MenuItem
        onClick={() => {
          setSelectedMenu("main");
          nav("/");
        }}
        selected={selectedMenu === "main"}
      >
        <p>MAIN</p>
      </MenuItem>

      <MenuItem
        onClick={() => {
          setSelectedMenu("about");
          nav("/about");
        }}
        selected={selectedMenu === "about"}
      >
        <p>ABOUT</p>
      </MenuItem>
      <MenuItem
        id="register"
        onClick={() => {
          setSelectedMenu("register");
          nav("/register");
        }}
        selected={selectedMenu === "register"}
      >
        <p>REGISTER</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          authctx.signout(() => nav("/"));
        }}
      >
        <p>LOGOUT</p>
      </MenuItem>
    </nav>
  );
};

export default MenuBar;
