const mongoose = require('mongoose');
const winston = require('winston');
const chalk = require('chalk');
const config = require('../config');

let { connection } = mongoose;

connection.on('error', (error) => {
  winston.error(chalk.bold.red(error));
});

connection.once('open', () => {
  winston.info(chalk.bold.green('Connected to Mongo.'));
});

connection.on('disconnected', () => {
  // Reconnect
  mongoose.connect((config.mongo.uri + config.mongo.database), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    socketTimeoutMS: 90000,
    keepAlive: true,
    autoReconnect: true,
    reconnectInterval: 500, // in 500ms
    reconnectTries: 30, // 30 times
    poolSize: 5, //
    bufferMaxEntries: 0
  });
}, (err) => {
  if (err) winston.error(err);
  else winston.info(chalk.bold.red('Mongo reconnected after disconnection.'));
  const conn = mongoose.connection;
  connection = conn;
});

const gracefulExit = () => {
  mongoose.connection.close(() => {
    winston.info(chalk.bold.red('Mongo is disconnected through app termination'));
    process.exit(0);
  });
};

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit);
process.on('SIGTERM', gracefulExit);

mongoose.connect((config.mongo.uri + config.mongo.database), {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  socketTimeoutMS: 90000,
  keepAlive: true,
  autoReconnect: true,
  reconnectInterval: 500, // in 500ms
  reconnectTries: 30, // 30 times
  poolSize: 5, //
  bufferMaxEntries: 0
}, (err) => {
  if (err) winston.info(chalk.bold.red(`Mongo first time connection Error:' ${err}`));
  else winston.info(chalk.bold.green('Mongo first time connected'));
});
