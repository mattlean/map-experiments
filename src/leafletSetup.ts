import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon-2x.png";

const DefaultIcon = L.icon({ iconUrl: markerIcon });
L.Marker.prototype.options.icon = DefaultIcon;
