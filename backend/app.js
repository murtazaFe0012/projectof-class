import express from 'express';
import mysql from 'mysql2/promise';

const app = express()

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'eventdb',
});

await app.get('/events', async (req, res) => { //get events
    try {
        const [rows] = await connection.query('SELECT * FROM `events`');   
        res.json(rows)
        return rows;
    } catch (err) {
        console.log(err);
    }
})

await app.get('/event', async (req, res) => { //get events
    try {
        console.log(req.query.slug);
        res.sendStatus(200);
        
    } catch (err) {
        console.log(err);
    }
})



app.listen(4000, () => {
  console.log('Server is courrir on http://localhost:4000')
})
