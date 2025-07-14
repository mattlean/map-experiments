import "leaflet/dist/leaflet.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import HelloWorld from "./HelloWorld";
import "./index.css";
import "./leafletSetup";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error('HTML element with an ID of "root" was not found.');
}

const root = createRoot(rootEl);
root.render(
  <StrictMode>
    <HelloWorld />
  </StrictMode>,
);
