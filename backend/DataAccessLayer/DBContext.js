var mysql = require("mysql");

let conn = mysql.createPool({
  connectionLimit: 1000,
  host: "quora.cfhkepqloqab.us-east-1.rds.amazonaws.com",
  user: "quorauser",
  password: "oNKU4VCM",
  database: "quora"
});

// var mysql = require("mysql");

// let conn = mysql.createPool({
//   connectionLimit: 1000,
//   host: "localhost",
//   user: "root",
//   database: "quora"
// });

module.exports = conn;
