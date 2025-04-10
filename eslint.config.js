import eslintJs from "@eslint/js";
import pkg from "globals";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { resolve } from "path";
import { globSync } from "glob";
import { parser as tsParser, plugin as tsPlugin } from "typescript-eslint";

// Global variables for node and browser environments
const { node, browser } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Find all tsconfig.json files in the apps directory
const tsconfigPaths = globSync("./apps/*/tsconfig*.json", {
  cwd: __dirname,
}).map((path) => resolve(__dirname, path));

export default [
  {
    ignores: ["**/dist/**", "**/node_modules/**", "**/vite.config.d.ts"],
  },
  eslintJs.configs.recommended,
  {
    // ESLint config for JavaScript files in the repo
    files: ["**/eslint.config.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
    },
  },
  {
    // TypeScript config for files with .ts and .tsx extensions
    files: ["**/*.{ts,tsx}"],
    ignores: ["**/eslint.config.js"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...node,
        ...browser,
      },
      parser: tsParser,
      parserOptions: {
        project: tsconfigPaths,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "no-console": "warn",
      "no-useless-catch": "warn",
      quotes: ["warn", "double", { allowTemplateLiterals: true }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
  {
    // TypeScript config for Node.js files (server-side code)
    files: ["**/apps/server/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./apps/server/tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    // TypeScript config for React client-side code
    files: ["**/apps/client/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ["./apps/client/tsconfig.json"],
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];
