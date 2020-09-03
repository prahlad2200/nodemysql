const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000;

const connection = mysql.createConnection({
    host : "localhost",
    user : "admin",
    password : "admin123"
})

connection.connect((err) => {
    if(err) throw err;
    console.log("Mysql connected....")
})

//show all dbs
app.get('/alldb',(req, res) => {
    let sql = 'SHOW databases';
    connection.query(sql, (err, results)=>{ 
        if(err) throw err
        rows = JSON.parse(JSON.stringify(results));
        let alldbs ='';
        for(let d in rows)
        { 
            alldbs +=" <br> " + rows[d].Database;
        }
        res.send("Database listed" + alldbs)
    })
})

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port port!`))