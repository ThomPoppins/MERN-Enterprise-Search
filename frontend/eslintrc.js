module.exports = {
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    env: {
      browser: true,
      es2021: true,
    },
    extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
    plugins: ["react", "react-hooks"],
    rules: {
      // Define your custom ESLint rules here, if needed.
    },
  };