const path = require("path");
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "halapro",
    projectName: "navbar",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    output: {
      publicPath: path.resolve(__dirname, "public"),
    },
    resolve: {
      modules: ["node_modules"],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: "micro-root",
        library: { type: "var", name: "micro-root" },
        shared: ["react", "react-dom"],
      }),
    ],
  });
};
