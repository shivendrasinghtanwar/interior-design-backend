const mysql = require('../../config/db/mySqlConn');

class MySqlExec {
  async getData(query) {
    return new Promise(async (resolve, reject) => {
      const conn = await mysql.getConnectionFromPool();
      conn.query(query, (err, result) => {
        conn.release();
        if (err) return reject(err);
        const string = JSON.stringify(result);
        const json = JSON.parse(string);
        return resolve(json);
      });
    });
  }

  async mySqlTxn(arrayOfQueryInSequence) {
    const queryArray = arrayOfQueryInSequence;
    const conn = await mysql.getConnectionFromPool();
    let insertedUserId = 0;
    try {
      await (new MySqlExec()).execTxn(conn, 'START TRANSACTION;');
      for (let i = 0; i < queryArray.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        const dbResponse = await (new MySqlExec()).execTxn(conn, queryArray[i]);
        if (i === 0) insertedUserId = dbResponse.insertId;
        if (i < queryArray.length - 1 && queryArray[i + 1].includes('LAST_INSERT_USER_ID')) {
          queryArray[i + 1] = queryArray[i + 1].replace('LAST_INSERT_USER_ID', insertedUserId);
        }
      }
      const finalDbResponse = await (new MySqlExec()).execTxn(conn, 'COMMIT;');
      await conn.release();
      return finalDbResponse;
    } catch (err) {
      console.log('err in mysqlTxn -> ', err);
      await (new MySqlExec()).execTxn(conn, 'ROLLBACK;');
      await conn.release();
      return err;
    }
  }

  async execTxn(conn, query) {
    console.log(query);
    return new Promise((resolve, reject) => {
      conn.query(query, (err, result) => {
        if (err) return reject(err);
        const string = JSON.stringify(result);
        const json = JSON.parse(string);
        return resolve(json);
      });
    });
  }
}

module.exports = new MySqlExec();
