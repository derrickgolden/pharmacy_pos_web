const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Zippy@123456",
    database: "pharmacy_pos",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
// const pool = mysql.createPool({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

module.exports = {
    pool,
}