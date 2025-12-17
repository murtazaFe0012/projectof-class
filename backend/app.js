import express from 'express';
import mysql from 'mysql2/promise';

const app = express()
app.use(express.json());

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
//get each event by slug individually
await app.get('/e/:slug', async (req, res) => { 
    try {
        const event = await connection.query('SELECT * FROM `events` WHERE slug = ?', [req.params.slug]);
        if (!event){
            return res.status(404).send('Event not found');
        }
        res.json(event[0]);
        return event;
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})



app.listen(4000, () => {
  console.log('Server is courrir on http://localhost:4000')
})
