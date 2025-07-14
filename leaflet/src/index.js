import drawMap from "./drawMap";
import "./index.css";
import "./setupLeaflet";

const rootEl = document.getElementById("root");

if (!rootEl) {
  throw new Error('HTML element with an ID of "root" was not found.');
}

const mapEl = document.createElement("div");
mapEl.setAttribute("id", "map");
rootEl.appendChild(mapEl);

drawMap();
