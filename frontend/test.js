const express = require("express");
const sqlite = require('sqlite');
const sqlite3 = require('sqlite3');
const app = express();

let db;

async function openDb() {
    db = await sqlite.open({
        filename: './events.db',
        driver: sqlite3.Database
    });
    //tes
    await db.exec(`
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY,
            image_url TEXT,
            category TEXT,
            title TEXT,
            description TEXT,
            date TEXT,
            location TEXT,
            attendance INTEGER,
            capacity INTEGER,
            price REAL
        );
    `);

}

openDb().then(() => {
    app.listen(3000, () => {
        console.log('Server running http://localhost:3000');
        console.log('Database connected: events.db');
    });
}).catch(err => {
    console.error("Erreur de connexion à la base de données:", err);
});

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get("/", async (req, res) => {
    let events = [];
    try {
        const query = 'SELECT * FROM events';
        events = await db.all(query);

    } catch (error) {
        console.error("Erreur lors de la récupération des événements:", error);
        events = [];
    }

    res.render("home", {
        title: 'Événements',
        events: events
    });
});

app.post("/new_event", async (req, res) => {
    // Ici, vous ajouteriez le code pour insérer req.body dans la BDD
    console.log("Nouvel événement soumis:", req.body);
    res.redirect('/');
});