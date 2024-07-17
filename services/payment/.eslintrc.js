module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  ignorePatterns: ['node_modules/*', 'dist/*', 'client/build/*', 'package.json', 'package-lock.json', '.prettierrc.json'],
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'], // TypeScript files
      rules: {
        // TypeScript specific rules
        // should eventually be turned on:
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['client/**/*.js', 'client/**/*.jsx'], // React client in JS
      rules: {
        // React specific rules
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  // ignore the node_modules folders, dist folder and the client/build folder.
  rules: {
    'prettier/prettier': 'error',
  },
};
