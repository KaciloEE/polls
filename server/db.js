const mongoose = require('mongoose');
const config = require('./config');
const { db: { host, port, name } } = config;

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${host}:${port}/${name}`);
mongoose.connection
  .once('open', () => console.log('Connected to Mongo instance.'))
  .on('error', error => console.log('Error connecting to Mongo:', error));