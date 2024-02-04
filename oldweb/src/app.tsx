import React, { useState, createContext, useContext } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider, AuthContext } from "./components/authcontext";
import Index from "./components/pages";
import Login from "./components/pages/login";
import RequireAuth from "./components/requireauth";
import PageLayout from "./components/pagelayout";
import About from "./components/pages/about";
import Register from "./components/pages/register";

const title = "The Old Web";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<PageLayout title={title} />}>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Index />
              </RequireAuth>
            }
          />
          <Route
            path="/about"
            element={
              <RequireAuth>
                <About />
              </RequireAuth>
            }
          />
          <Route
            path="/register"
            element={
              <RequireAuth>
                <Register />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
