import React, { useState, createContext, useContext, ReactNode } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

import { AuthProvider, AuthContext } from "./authcontext";

type Props = {
  children?: ReactNode;
};

function RequireAuth({ children }: Props) {
  let authctx = useContext(AuthContext);
  let location = useLocation();

  if (!authctx.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
