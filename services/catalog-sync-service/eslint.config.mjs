import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import path from "path";
import { fileURLToPath } from "url";
import customRules from "./.eslintrc-custom-rules.js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    // Ignorar arquivos/diretórios específicos
    ignores: [
      "node_modules/**",
      "dist/**",
      "coverage/**",
      "*.js",
      "jest.config.js",
    ],
  },
  {
    // Configuração para arquivos TypeScript
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: path.join(__dirname, "tsconfig.json"),
        tsconfigRootDir: __dirname,
        sourceType: "module",
        ecmaVersion: "latest",
      },
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        global: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "custom": customRules,
      "prettier": prettierPlugin,
    },
    rules: {
      // Regras TypeScript básicas
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-module-boundary-types": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      
      // Regras customizadas específicas do projeto
      "custom/single-entity-per-forFeature": "error",
      "custom/unique-entity-per-project": "error", 
      "custom/entity-module-naming-consistency": "warn",
      "custom/controller-must-use-plain-to-instance": "error",
      "custom/nestjs-only-http-exceptions": "error",
      
      // Integração com Prettier
      "prettier/prettier": "error",
    },
  },
  {
    // Configuração específica para arquivos de teste
    files: ["test/**/*.ts", "**/*.spec.ts", "**/*.test.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: path.join(__dirname, "tsconfig.json"),
        tsconfigRootDir: __dirname,
        sourceType: "module",
      },
      globals: {
        jest: "readonly",
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "prettier": prettierPlugin,
    },
    rules: {
      // Relaxar algumas regras para testes
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      
      // Regras específicas para testes
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      
      // Prettier
      "prettier/prettier": "error",
    },
  },
  // Aplicar configuração do Prettier para desabilitar regras conflitantes
  prettierConfig,
];