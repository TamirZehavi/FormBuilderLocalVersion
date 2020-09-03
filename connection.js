const mysql = require("mysql");

//Create connection
const db = mysql.createConnection({
  host: "us-cdbr-east-02.cleardb.com",
  user: "b11f362a16612f",
  password: "d4c10019",
  database: "heroku_79c923155b273f2",
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
