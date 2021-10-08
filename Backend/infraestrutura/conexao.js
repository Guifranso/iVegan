const mysql = require('mysql')

const conexao = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123',
    database: 'iVegan'
})

module.exports = conexao

//roda issaq no mysql se n n roda ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123'; 