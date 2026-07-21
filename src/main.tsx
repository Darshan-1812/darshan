/**
 * © 2026 Mohammad Fazil Firojkhan Malek. All rights reserved.
 * Watermark-ID: MF-FIROJKHAN-MALEK-2026
 * This codebase is protected under intellectual property laws.
 * Author: Mohammad Fazil Firojkhan Malek
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { initSecurity } from "./utils/security";

// Initialize client-side security blocker & anti-debugging trap
initSecurity();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
