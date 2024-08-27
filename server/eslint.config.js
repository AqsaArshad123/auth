const globals = require("globals");
const pluginJs = require("@eslint/js");

module.exports = [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      "prettier/prettier": "error",
      "linebreak-style": "off",
    },
    plugins: {
      prettier: require("eslint-plugin-prettier"),
    },
  },
];
