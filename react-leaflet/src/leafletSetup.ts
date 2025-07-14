import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

const DefaultIcon = L.icon({
  iconSize: [50, 82],
  iconUrl: markerIcon,
  shadowSize: [41, 41],
  shadowUrl: markerShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;
