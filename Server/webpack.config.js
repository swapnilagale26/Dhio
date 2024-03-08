const path = require('path');
const webpack = require('webpack');

const environment = process.env.ENVIRONMENT;

console.log('environment:::::', environment);

let ENVIRONMENT_VARIABLES = {
  'process.env.ENVIRONMENT': JSON.stringify('development'),
  'process.env.PORT': JSON.stringify('3001'),
  'process.env.MONGO_CONNECTION_STRING': JSON.stringify('mongodb://localhost:27017/leamo')
};

if (environment === 'test') {
  ENVIRONMENT_VARIABLES = {
    'process.env.ENVIRONMENT': JSON.stringify('test'),
    'process.env.PORT': JSON.stringify('3001'),
    'process.env.MONGO_CONNECTION_STRING': JSON.stringify('mongodb+srv://leamo:9togngXR1ERQJ6Co@leamo0.oegh5bz.mongodb.net/?retryWrites=true&w=majority')
  };
} else if (environment === 'production') {
  ENVIRONMENT_VARIABLES = {
    'process.env.ENVIRONMENT': JSON.stringify('production'),
    'process.env.PORT': JSON.stringify('80'),
    'process.env.MONGO_CONNECTION_STRING': JSON.stringify('mongodb+srv://leamo:9togngXR1ERQJ6Co@leamo0.oegh5bz.mongodb.net/?retryWrites=true&w=majority')
  };
}

module.exports = {
  entry: './server.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.js',
  },
  target: 'node',
  plugins: [
    new webpack.DefinePlugin(ENVIRONMENT_VARIABLES),
  ],
};