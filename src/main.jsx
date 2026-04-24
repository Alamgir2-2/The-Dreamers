// src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; 
import "./index.css";
import App from "./App.jsx";
import API_URL from "./config/api.js";

// Wake up Render backend on app load
fetch(`${API_URL}/api/members`).catch(() => {});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router> 
      <App />
    </Router>
  </StrictMode>
);
