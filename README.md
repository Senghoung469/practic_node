# Requirement
node js
mysql

# Install or update dependencies in package.json
npm i or npm install

Start serve
npm run dev

# How to config connection 
check in folder config create database and run script db
dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'database_name'
});

