import express from 'express';
import mysql, { raw } from 'mysql2/promise';
import slugify from 'slugify';
import path from 'path';
import session from 'express-session';
import bcrypt from 'bcrypt';
import { fileURLToPath } from 'url';
const app = express()
app.use(express.json());

app.use(session({
  name: 'event-session',
  secret: 'SUPER_SECRET_KEY_CHANGE_ME',
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 2 // 2 hours
  },
  resave: false
}));

function generateSlug(title, id) {
  const rawSlug = `${slugify(title,
    { lower: true, strict: true, locale: 'fr' })}-tickets-${id}`;
  return rawSlug;
}


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'eventdb',
});
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'eventdb',
  waitForConnections: true,
  connectionLimit: 10
});
<<<<<<< HEAD
await app.get('/categories', async (req, res) => { //get categorys
  try {
    const [rows] = await connection.query('SELECT * FROM categorys');
    res.json(rows);
    res.render("categorys", { data: rows });
    return rows;
  } catch (err) {
    console.log(err);
  }
=======
//getting profile page
app.get('/profile', (req, res) => {
    res.render("profile");
})

//checking if user exists - login simulation
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const [rows] = await connection.execute(`
          
          SELECT u.id, u.Fname, u.Lname, u.mail, r.name 
          AS role From users u
          JOIN roles r ON u.roleID = r.id
          WHERE u.mail = ? AND u.password = ?`,
          [email, password]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        req.session.user = rows[0];
        res.redirect('/events');
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' }); 
    }
});
//get all categorys
await app.get('/categories', async (req, res) => { //get categorys
  try {
    const [rows] = await connection.query('SELECT * FROM categorys');
        res.json(rows);
        res.render("categorys", {data: rows});
        return rows;
    } catch (err) {
        console.log(err);
    }
>>>>>>> murtaza
});

//get all roles
await app.get('/roles', async (req, res) => { //get roles
  try {
    const [rows] = await connection.query('SELECT * FROM roles');
    res.json(rows)
    res.render("roles", { data: rows });
    return rows;
  } catch (err) {
    console.log(err);
  }
});

//get all events
await app.get('/events', async (req, res) => { //get events
  try {
    const [data] = await connection.query(`
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
    res.render("home", { data });
  } catch (err) {
    console.log(err);
  }
})

//get each event by slug individually
await app.get('/e/:slug', async (req, res) => {

  try {
    const [rows] = await connection.query(`
            SELECT
            e.title,
            e.dateStart,
            e.dateEnd,
            e.description,
            JSON_OBJECT(
                'street', a.street,
                'city' , a.city,
                'postalCode', a.postalCode,
                'country', a.country, 
                'longitude', a.longitude,
                'latitude', a.latitude
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
            WHERE e.slug = ?
            `, [req.params.slug]);
<<<<<<< HEAD
    res.json(rows)
    res.render("event", { data: rows });
    return rows;
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
=======
        // res.json(rows)
        res.render("event", {data: rows});
        return rows;
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
>>>>>>> murtaza
})


//logout route
app.post('/logout', (req, res) => {
  req.session.destroy(()=>{
    res.clearCookie('event-session');
    res.redirect('/login');
  })
});



//here we create new event using post method

app.post('/event', async (req, res) => {
  const conn = await pool.getConnection(); // ✅ now exists

  try {
    await conn.beginTransaction();

    const {
      title,
      dateStart,
      dateEnd,
      description,
      prix,
      availablePlaces,
      maxPlaces,
      image,
      categoryID,
      orgranisatorID,
      address
    } = req.body;

    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    // Insert address
    const [addressResult] = await conn.execute(
      `INSERT INTO adresses (street, city, postalCode, country, longitude, latitude)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        address.street,
        address.city,
        address.postalCode,
        address.country,
        address.longitude,
        address.latitude
      ]
    );

    const adresseID = addressResult.insertId;

    // Insert event
    const [eventResult] = await conn.execute(
      `INSERT INTO events
      (title, updateAt, dateStart, dateEnd, adresseID, orgranisatorID, categoryID,
       description, prix, availablePlaces, maxPlaces, image)
      VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
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
      ]
    );

    const eventId = eventResult.insertId;
    const slug = generateSlug(title, eventId);

    // Update slug
    await conn.execute(
      `UPDATE events SET slug = ? WHERE id = ?`,
      [slug, eventId]
    );

    await conn.commit();

    res.status(201).json({
      message: 'Event created successfully',
      eventId,
      slug
    });

  } catch (err) {
    await conn.rollback();
    console.error('CREATE EVENT ERROR:', err);
    res.status(500).json({ error: 'Failed to create event' });
  } finally {
    conn.release(); //
  }
});


//here we create new catagory using post method
app.post('/categories', async (req, res) => {
  const { name } = req.body;
  const [result] = await connection.execute(
    `INSERT INTO categorys (name) VALUES (?)`,
    [name]);
  res.status(201).json({ id: result.insertId, message: 'Category created successfully' });
});


app.get("/create_event", async (req, res) => {
  res.render("create_event");
})

app.get("/profile", async (req, res) => {
  res.render("profile");
})

app.listen(3000, () => {
  console.log('server running http://localhost:3000')
})