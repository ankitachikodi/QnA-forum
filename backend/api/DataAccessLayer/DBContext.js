var mysql = require('mysql');

let conn = mysql.createPool({
	connectionLimit: 1000,
	host: "localhost",
	user: "root",
	database: "quora"
});

module.exports = conn;