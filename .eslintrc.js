module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    // Contoh aturan tambahan (boleh dikustom sesuai preferensi)
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    'comma-dangle': ['error', 'only-multiline'],
    'linebreak-style': 'off', // Disable untuk pengguna Windows
  },
};
