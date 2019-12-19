module.exports = {
  presets: [
    ['@vue/app', { 'useBuiltIns': 'entry' }],
    '@babel/env',
    '@babel/typescript'
  ],
  plugins: [
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    ['@babel/plugin-proposal-class-properties', { 'loose': true }],
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-typescript'
  ]
};

