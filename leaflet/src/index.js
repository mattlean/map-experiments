import "./index.css";
import setupLeafletMap from "./leafletMap";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error('HTML element with an ID of "root" was not found.');
}

const mapEl = document.createElement("map");
mapEl.setAttribute("id", "map");
rootEl.appendChild(mapEl);

setupLeafletMap();
