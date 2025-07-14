import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

export default function setupLeafletMap() {
  /* Set default icon since we use a different base path than the default one Leaflet expects for images */
  const DefaultIcon = L.icon({
    iconSize: [50, 82],
    iconUrl: markerIcon,
    shadowSize: [41, 41],
    shadowUrl: markerShadow,
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  /* Basic map example */
  // const map = L.map("map").setView([39.75621, -104.99404], 13);

  // L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  //   maxZoom: 19,
  //   attribution:
  //     '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  // }).addTo(map);

  /* Layers control example */
  const littleton = L.marker([39.61, -105.02]).bindPopup(
      "This is Littleton, CO.",
    ),
    denver = L.marker([39.74, -104.99]).bindPopup("This is Denver, CO."),
    aurora = L.marker([39.73, -104.8]).bindPopup("This is Aurora, CO."),
    golden = L.marker([39.77, -105.23]).bindPopup("This is Golden, CO.");

  const cities = L.layerGroup([littleton, denver, aurora, golden]);

  const osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap",
  });

  const osmHOT = L.tileLayer(
    "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
      attribution:
        "© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France",
    },
  );

  const map = L.map("map", {
    center: [39.73, -104.99],
    zoom: 10,
    layers: [osm, cities],
  });

  const baseMaps = {
    OpenStreetMap: osm,
    "<span style='color: red'>OpenStreetMap.HOT</span>": osmHOT,
  };

  const overlayMaps = {
    Cities: cities,
  };

  L.control.layers(baseMaps, overlayMaps).addTo(map);

  /* Create standard marker */
  L.marker([51.5, -0.09]).addTo(map);

  /* Basic GeoJSON feature example */
  // const geojsonFeature = {
  //   type: "Feature",
  //   properties: {
  //     name: "Coors Field",
  //     amenity: "Baseball Stadium",
  //     popupContent: "This is where the Rockies play!",
  //   },
  //   geometry: {
  //     type: "Point",
  //     coordinates: [-104.99404, 39.75621],
  //   },
  // };

  /* Create standard marker with GeoJSON */
  // L.geoJSON(geojsonFeature).addTo(map);

  /* Create circle marker with GeoJSON */
  // const geojsonMarkerOptions = {
  //     radius: 8,
  //     fillColor: "#ff7800",
  //     color: "#000",
  //     weight: 1,
  //     opacity: 1,
  //     fillOpacity: 0.8,
  //   };

  // L.geoJSON(geojsonFeature, {
  //   pointToLayer: function (feature, latlng) {
  //     return L.circleMarker(latlng, geojsonMarkerOptions);
  //   },
  // }).addTo(map);

  /* Attach pop-up to feature when clicked */
  const geojsonFeature = {
    type: "Feature",
    properties: {
      name: "Coors Field",
      amenity: "Baseball Stadium",
      popupContent: "This is where the Rockies play!",
    },
    geometry: {
      type: "Point",
      coordinates: [-104.99404, 39.75621],
    },
  };

  L.geoJSON(geojsonFeature, {
    onEachFeature: onEachFeature,
  }).addTo(map);

  function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
      layer.bindPopup(feature.properties.popupContent);
    }
  }

  /* Filter GeoJSON features so "Busch Field" isn't shown */
  const someFeatures = [
    {
      type: "Feature",
      properties: {
        name: "Coors Field",
        show_on_map: true,
      },
      geometry: {
        type: "Point",
        coordinates: [-104.99404, 39.75621],
      },
    },
    {
      type: "Feature",
      properties: {
        name: "Busch Field",
        show_on_map: false,
      },
      geometry: {
        type: "Point",
        coordinates: [-104.98404, 39.74621],
      },
    },
  ];

  L.geoJSON(someFeatures, {
    filter: function (feature, layer) {
      return feature.properties.show_on_map;
    },
  }).addTo(map);

  /* Draw a line */
  const myLines = [
    {
      type: "LineString",
      coordinates: [
        [-100, 40],
        [-105, 45],
        [-110, 55],
      ],
    },
    {
      type: "LineString",
      coordinates: [
        [-105, 40],
        [-110, 45],
        [-115, 55],
      ],
    },
  ];

  const myStyle = {
    color: "#ff7800",
    weight: 5,
    opacity: 0.65,
  };

  L.geoJSON(myLines, { style: myStyle }).addTo(map);

  /* Draw polygons */
  const states = [
    {
      type: "Feature",
      properties: { party: "Republican" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-104.05, 48.99],
            [-97.22, 48.98],
            [-96.58, 45.94],
            [-104.03, 45.94],
            [-104.05, 48.99],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { party: "Democrat" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-109.05, 41.0],
            [-102.06, 40.99],
            [-102.03, 36.99],
            [-109.04, 36.99],
            [-109.05, 41.0],
          ],
        ],
      },
    },
  ];

  L.geoJSON(states, {
    style: function (feature) {
      switch (feature.properties.party) {
        case "Republican":
          return { color: "#ff0000" };
        case "Democrat":
          return { color: "#0000ff" };
      }
    },
  }).addTo(map);
}
