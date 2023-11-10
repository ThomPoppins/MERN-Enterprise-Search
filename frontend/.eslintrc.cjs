module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:all",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"], // Ignore dist folder and this file itself
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "max-lines-per-function": ["off", { max: 50, skipBlankLines: true }], // We use Prettier for this
    "no-ternary": "off", // We use ternary operators
    "sort-imports": "off", // We use Prettier for this
    "sort-vars": "off", // We use Prettier for this
    ignoreTopLevelFunctions: true, // We use Prettier for this
    "react-refresh/only-export-components": [
      "warn", // "error" for production
      { allowConstantExport: true }, // Allow named exports
    ],
  },
};
