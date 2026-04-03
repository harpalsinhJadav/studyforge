/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: [require.resolve('./eslint.js'), 'plugin:react/recommended', 'plugin:react-hooks/recommended'],
  plugins: ['react', 'react-hooks'],
  env: { browser: true },
  settings: { react: { version: 'detect' } },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
  },
};
