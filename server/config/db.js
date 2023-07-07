const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./veritabani.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
    else {
        console.log("database aktif");
    }
});

const sql = "CREATE TABLE IF NOT EXISTS questions(id INTEGER PRIMARY KEY, name, questions REFERENCES question(id))"
db.run(sql);

const sql2 = "CREATE TABLE IF NOT EXISTS interview(id INTEGER PRIMARY KEY, username, date, questionset REFERENCES questions(id))"
db.run(sql2);

const sql3 = "CREATE TABLE IF NOT EXISTS question(id INTEGER PRIMARY KEY, title, degree, answers)"
db.run(sql3);

module.exports = db;

module.exports = db;