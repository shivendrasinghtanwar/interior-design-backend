const mysql = require('mysql');
// const mysql = require('@mysql/xedvapi');
const winston = require('winston');
const chalk = require('chalk');
const config = require('../config');

class MySqlConn {
  constructor() {
    console.log(config.mySql.user);
    this.pool = mysql.createPool({
      connectionLimit: 20,
      host: config.mySql.host,
      port: config.mySql.port,
      user: config.mySql.user,
      password: config.mySql.password,
      database: config.mySql.db
    });
  }

  async getConnectionFromPool() {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection) => {
        if (err) {
          if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            winston.error(chalk.bold.red('MySql connection was closed.'));
          } else if (err.code === 'ER_CON_COUNT_ERROR') {
            winston.error(chalk.bold.red('MySql has too many connections.'));
          } else if (err.code === 'ECONNREFUSED') {
            winston.error(chalk.bold.red('MySql connection was refused.'));
          } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            winston.error(chalk.bold.red('MySql Access denied for user.'));
          } else {
            winston.error(chalk.bold.red(`MySql ${err.code}`));
          }
          return reject(err);
        }
        return resolve(connection);
      });
    });
  }

  async createMysqlCon() {
    const conn = mysql.createConnection({
      host: config.mySql.host,
      port: config.mySql.port,
      user: config.mySql.user,
      password: config.mySql.password,
      database: config.mySql.db
    });
    return new Promise((resolve, reject) => {
      conn.connect((err) => {
        if (err) return reject(err);
        return resolve(conn);
      });
    });
  }
}

module.exports = new MySqlConn();
