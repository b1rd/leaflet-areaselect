module.exports = {
  mode: 'production',
  output: {
    library: 'ReactLeaflet',
    libraryTarget: 'umd'
  },
  externals: [
    {
      leaflet: {
        amd: 'leaflet',
        commonjs: 'leaflet',
        commonjs2: 'leaflet',
        root: 'L'
      }
    },
    {
      jquery: {
        amd: 'jquery',
        commonjs: 'jquery',
        commonjs2: 'jquery',
         root: 'JQuery'
      }
    },
    {
      'react-leaflet': {
        amd: 'react-leaflet',
        commonjs: 'react-leaflet',
        commonjs2: 'react-leaflet'
      }
    },
    {
      react: {
        amd: 'react',
        commonjs: 'react',
        commonjs2: 'react',
        root: 'React'
      }
    },
    {
      'google-maps': {
        amd: 'google-maps',
        commonjs: 'google-maps',
        commonjs2: 'google-maps',
        root: 'GoogleMapsLoader'
      }
    }
  ],
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: 'babel-loader'},
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
};
