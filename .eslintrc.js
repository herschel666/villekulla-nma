module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    useJSXTextNode: true,
    project: './tsconfig.json',
  },
  env: {
    browser: true,
    commonjs: true,
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  globals: {},
  rules: {
    // 'typescript/no-var-requires': 'off',
    'react/prop-types': 'off',
  },
};
