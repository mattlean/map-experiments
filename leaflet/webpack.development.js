const path = require("path");
const {
  buildSourceMaps,
  ignoreWatch,
  injectCss,
  loadFonts,
  loadImages,
  setupDevServer,
} = require("ljas-webpack");
const { merge } = require("webpack-merge");

const { PATH_BUILD_DEV, PATH_ROOT, PATH_SRC } = require("./PATHS");

if (!process.env.PORT_WEBPACK_DEV_SERVER) {
  throw new Error("🔴 webpack-dev-server port was not set");
}

module.exports = merge([
  {
    mode: "development",

    output: {
      filename: "[name].js",
      path: PATH_BUILD_DEV,
    },

    target: "browserslist:development",
  },

  buildSourceMaps("cheap-module-source-map"),

  ignoreWatch(/node_modules/),

  injectCss({
    rule: {
      exclude: /node_modules(?!\/leaflet\/dist)/,
      include: [PATH_SRC, path.resolve(PATH_ROOT, "node_modules/leaflet/dist")],
    },
  }),

  loadFonts({
    rule: {
      generator: { filename: "assets/[name][ext][query]" },
      // Export the asset as a data URI if it's below the maxSize threshold,
      // otherwise emit it as a separate file and export the URL
      parser: { dataUrlCondition: { maxSize: 50000 } },
      type: "asset",
    },
  }),

  loadImages({
    rule: {
      generator: { filename: "assets/[name][ext][query]" },
      // Export the asset as a data URI if it's below the maxSize threshold,
      // otherwise emit it as a separate file and export the URL
      parser: { dataUrlCondition: { maxSize: 15000 } },
      type: "asset",
    },
  }),

  setupDevServer(),
]);
