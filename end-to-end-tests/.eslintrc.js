/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
  root: true,
  extends: [
    "plugin:playwright/recommended",
    "prettier",
  ],
};
