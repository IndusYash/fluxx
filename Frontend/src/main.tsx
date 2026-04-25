import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@/styles/globals.css";
import favicon from "@/assets/images/favicon.png"; // ✅ Import favicon

// Inject favicon dynamically
const link = document.createElement("link");
link.rel = "icon";
link.type = "image/png";
link.href = favicon; // Vite will handle bundling & hashing
document.head.appendChild(link);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
