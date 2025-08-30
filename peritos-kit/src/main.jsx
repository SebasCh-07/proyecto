// main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";  // 👈 importar
import App from "./App.jsx";
import "./styles.css";

// Registrar Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registrado: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW falló: ', registrationError);
      });
  });
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>   {/* 👈 envolver */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
