const mysql = require("mysql");

//Create connection
const db = mysql.createConnection({
  host: "35.205.54.191",
  user: "root",
  password: "1234",
  database: "forms",
});

//Connect
db.connect((error) => {
  if (error) {
    throw error;
  } else {
    console.log("Database connected");
    return db;
  }
});

module.exports = db;
