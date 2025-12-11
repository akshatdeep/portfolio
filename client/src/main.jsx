import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MouseProvider } from "./context/MouseContext.jsx"; // ✅ Correct import

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MouseProvider> {/* ✅ Use provider here */}
        <App />
      </MouseProvider>
    </BrowserRouter>
  </StrictMode>
);
