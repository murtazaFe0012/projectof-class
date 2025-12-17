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
        const [oldrows] = await connection.query('SELECT * FROM `events`');  
        
        const [rows] = await connection.query(`
            SELECT
            e.title,
            e.dateStart,
            JSON_OBJECT(
                'country', a.country, 
                'postalCode', a.postalCode,
                'city' , a.city
            ) AS adresse,
            JSON_OBJECT(
                'company', o.name,
                'contact', JSON_OBJECT(
                    'mail', u.mail,
                    'tel', u.tel
                )
            ) AS organisator,
            c.name AS category,
            e.prix,
            e.availablePlaces,
            e.maxPlaces,
            e.image,
            e.slug
            FROM events e
            LEFT JOIN adresses a ON e.adresseID = a.id
            LEFT JOIN organisators o ON e.orgranisatorID = o.id
            LEFT JOIN users u ON o.userID = u.id
            LEFT JOIN categorys c ON e.categoryID = c.id
            `);  
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
