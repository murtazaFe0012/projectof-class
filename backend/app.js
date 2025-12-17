import express from 'express';
import mysql, { raw } from 'mysql2/promise';
import slugify from 'slugify';

function generateSlug(title, id) {
    const rawSlug = `${slugify(title, 
        { lower: true, strict: true, locale: 'fr' })}-tickets-${id}`;
    return rawSlug;
}

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


//here we create new event using post method
await app.post('/event', async (req, res) => {
    try {
        const {
             title,
      dateStart,
      dateEnd,
      adresseID,
      orgranisatorID,
      categoryID,
      description,
      prix,
      availablePlaces,
      maxPlaces,
      image
        } = req.body;
        const [result] = await connection.execute(
            `INSERT INTO events 
      (title, updateAt, dateStart, dateEnd, adresseID, orgranisatorID, categoryID,
       description, prix, availablePlaces, maxPlaces, image)
      VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, dateStart, dateEnd, adresseID, orgranisatorID, categoryID, description, prix, availablePlaces, maxPlaces, image]);

      const slug = generateSlug(title, result.insertId);//generate slug after inserting to get the id
    //update the event with the generated slug
        await connection.execute(
        `UPDATE events SET slug = ? WHERE id = ?`,
             [slug, result.insertId]);
        res.status(201).json({
            message: 'Event created successfully',
            id: result.insertId, 
            slug});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to create event' });
    }
});
//here we create new address using post method
await app.post('/addresses', async (req, res) => {
   const { street, city, postalCode, country, longitude, latitude } = req.body;
   const [result] = await connection.execute(
    `INSERT INTO adresses (street, city, postalCode, country, longitude, latitude)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [street, city, postalCode, country, longitude, latitude]
  );
  res.status(201).json({id: result.insertId, message: 'Address created successfully' });
});
//here we create new catagory using post method
app.post('/categories', async (req, res) => {
    const { name } = req.body;
    const [result] = await connection.execute(
         `INSERT INTO categorys (name) VALUES (?)`,
    [name]);
    res.status(201).json({id: result.insertId, message: 'Category created successfully' });
});


app.listen(4000, () => {
  console.log('Server is courrir on http://localhost:4000')
})
