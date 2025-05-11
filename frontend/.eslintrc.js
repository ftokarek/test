module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  rules: {
    'no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    'react/no-unescaped-entities': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@next/next/no-html-link-for-pages': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
  },
  ignorePatterns: ['node_modules/**', '.next/**', 'out/**'],
};
