module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react','@babel/preset-flow'],
  plugins: [['react-native-web', { commonjs: true }]],
}
