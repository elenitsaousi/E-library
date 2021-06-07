//server
const express = require('express');

const cors = require('cors');
const parser = require('body-parser');
//const { query } = require('express'); //to ekana etsi giati mou ipogrammize to -> const parser = require('body-parser')
const app = express();
app.use(parser.json());

//database (sqlite3)
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('books.sqlite');

app.use(cors())
app.use(express.json())
    //app.use(express.urlencoded({ extended: true }))



//places on the database all the information provided by the user

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



//returns from the database all the values of the book which has the same title with the user's input
app.get('/books/:key', async(req, res) => {
    const q = `SELECT * FROM books WHERE title LIKE '%${req.params.key}%';`;
    try {
        const rows = await query(q);
        res.send(JSON.stringify(rows));
    } catch (err) {
        res.send('error excecuting query');
    }
});



//read all the books from the database
app.get('/listBooks', async(req, res) => {
    const q = 'SELECT * FROM books';
    try {
        const rows = await query(q);
        res.send(JSON.stringify(rows));
    } catch (err) {
        res.send('error excecuting query');
    }
});

//async function
function query(q) {
    return new Promise((resolve, reject) => {
        db.all(q, (err, rows) => {
            if (err) {
                reject(err);
                exit(err);
            } else {
                resolve(rows);
            }
        });
    });

}

//the port of server
app.listen(3000);
