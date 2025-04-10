import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.browser,
    },
    plugins: [js],
    ...js.configs.recommended,
  },
  {
    files: ["**/*.{ts,tsx}"],
    ...tseslint.configs.recommended,
  },
  {
    rules: {
      "no-console": "error",
      "no-useless-catch": "off",
      quotes: ["error", "double", { allowTemplateLiterals: true }],
    },
  },
]);
