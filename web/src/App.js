import React, { useState } from "react";

import Products from "./components/products";
import Login from "./components/login";

import "./App.css";

function App() {
  const [display, setDisplay] = useState("login");

  const loginCallback = () => {
    setDisplay("products");
  };

  switch (display) {
    case "login":
      return <Login callback={loginCallback} />;
    case "products":
      return <Products />;
    default:
      return null;
  }
}

export default App;
