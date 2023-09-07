const mysql = require("mysql");
const mysql2 = require("mysql2/promise");

const openConnection = () => {
  const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    port: process.env.DB.PORT,
  });

  connection.connect();

  return connection;
};

const openConnection2 = async () => {
  const connection = await mysql2.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DB,
    port: process.env.DB.PORT,
  });

  return connection;
};

module.exports = {
  openConnection,
  openConnection2,
};
