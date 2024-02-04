import React, { useState, ReactNode, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "./authcontext";
import Menu from "./molecules/menubar";

type Props = {
  title: string;
};

const PageLayout = ({ title }: Props) => {
  return (
    <div className="flex flex-col w-[500px] h-[400px] border-2 border-slate-300 p-3 rounded bg-slate-100">
      <header className="border-solid border-2 border-indigo-200 bg-white rounded-lg p-2 mb-3">
        <h1 className="text-2xl font-bold uppercase pb-1">{title}</h1>
        <Menu />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;
