module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'semi': [
      1,
      'always'
    ],
    'no-unused-vars': 1,
    'no-debugger': 'off',
    'no-console': 0,
    'vue/no-use-v-if-with-v-for': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
