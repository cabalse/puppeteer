import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react/cjs/react.production.min";

import App from "./app";
import mirageServer from "./mirage/mirageserver";

const root = createRoot(document.getElementById("app"));

// mirageServer();

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
