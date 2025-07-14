const buildHtml = require("ljas-webpack/buildHtml");
const { merge } = require("webpack-merge");

const { PATH_SRC } = require("./PATHS");

module.exports = merge([
  {
    entry: { app: `${PATH_SRC}/index.tsx` },

    output: { clean: true },
  },

  buildHtml({ title: "react-leaflet-playground" }),

  // Import .geojson files as JSON files
  {
    module: {
      rules: [
        {
          test: /\.(json|geojson)$/,
          type: "json",
        },
      ],
    },
  },
]);
