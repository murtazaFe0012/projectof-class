import express from 'express';
import mysql from 'mysql2/promise';

const app = express()

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'eventdb',
});

await app.get('/', (req, res) => {
    
  res.send(get())
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})

async function get(){
    try {
        const test = await connection.query('SELECT * FROM `roles`');

        console.log(test);
        return test;
    } catch (err) {
        console.log(err);
        return "fail";
    }
}