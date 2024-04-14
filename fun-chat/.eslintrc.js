module.exports = 
  {
    parser: "@typescript-eslint/parser",
    plugins: ["prettier", "import", "@typescript-eslint"],
    extends: [
      "airbnb-typescript",
      "airbnb/hooks",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:prettier/recommended",
      "plugin:import/recommended",
      "prettier"
    ],
    parserOptions: {
      "ecmaVersion": 2020,
      "sourceType": "module",
      "project": "./tsconfig.json",
      "noInlineConfig": 2,
      "tsconfigRootDir": __dirname
    },
    env: {
      es6: true,
      browser: true,
      node: true
    },
    rules: {
      "no-debugger": "off",
      "no-console": 0,
      "class-methods-use-this": "off",
      "@typescript-eslint/no-explicit-any": 2,
      "react/jsx-filename-extension": [0]
    },
    overrides: [
      {
        "files": ["webpack.config.js", "webpack.dev.config.js"],
        "rules": {
          "@typescript-eslint/no-var-requires": "off"
        }
      },
      {
        "files": ["**/*eslintrc.js"],
        "rules": {"tseslint.configs.disableTypeChecked": "off"}
      },
    ]
  }
