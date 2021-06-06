//const data = require('./data.js');

const express = require('express');

const cors = require('cors');
const { query } = require('express'); //to ekana etsi giati mou ipogrammize to -> const parser = require('body-parser')
const app = express();



const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('books.sqlite');

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



//post value

app.post('/books', (req, res) => {
    const books = req.body;
    const q = `insert into books values('${books.author}', '${books.title}', '${books.genre}', '${books.price}')`;
    console.log(q);
    db.run(q, (err) => {
        if (err) {
            res.send('Error executing query.');
        } else {
            res.send('ALL OK! NO PROBLEM');
        }
    });
});



//Get value by title
app.get('/books/:key', (req, res) => {
    const q = `SELECT * FROM books WHERE title LIKE '%${req.params.key}%';`;
    db.all(q, (err, rows) => {
        if (err) {
            console.err('Error querying db');
            res.send('error querying db');
        } else {
            res.send(JSON.stringify(rows));
        }
    });
});



//read Get value
app.get('/listBooks', (req, res) => {
    const q = 'SELECT * FROM books';
    db.all(q, (err, rows) => {
        if (err) {
            console.err('Error querying db');
            res.send('error querying db');
        } else {
            res.send(JSON.stringify(rows));
        }
    });
});



app.listen(3000);