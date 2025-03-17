var mysql = require('mysql2');
var util = require('util')

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my_store'
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL");
});

const exe= util.promisify(db.query).bind(db)

module.exports = exe;