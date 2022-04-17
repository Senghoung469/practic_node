![image](https://user-images.githubusercontent.com/37574332/163225868-119409ff-0526-47d7-9dbb-037f39c4f09c.png)
# Requirement
node js
mysql

# Install or update dependencies in package.json
npm i or npm install

Start serve
npm run dev

# Create .env
TOKEN_SECRET=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;

# How to config connection 
check in folder config create database and run script db
dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'database_name'
});

