module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
    'cypress/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', 'jest', 'cypress'],
  rules: {
    indent: ['error', 2],
    semi: ['error', 'never'],
    quotes: ['error', 'single'],
  },
}
