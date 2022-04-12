const mysql = require("mysql2");

// Create mysql connetion 
dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'practical'
});

dbConn.connect(function(error){
    if(error) throw error;
    console.log("Connection is successfully!!!");
});

module.exports = dbConn;
