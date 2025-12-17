const express = require("express")
const app = express()


// middlewares
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')


<<<<<<< HEAD
    , {
        id: 4,
        image_url: 'dance.jpg',
        category: 'Danse',
        title: "Festival de Danse Contemporaine",
        description: "Découvrez les performances de danseur contemporains dans une soirée exceptionnelle.",
        date: "28 juin 2025 à 10:00",
        location: "Musée des Beaux-Arts, Montreal",
        attendance: 187,
        capacity: 300,
        price: 10
    },
    {
        id: 5,
        image_url: 'food.jpg',
        category: 'Gastronomie',
        title: "Festival Gastronomique",
        description: "Savourez les meilleurs plats de chefs renommés lors de ce festival culinaire exceptionnel.",
        date: "1 juillet 2025 à 12:00",
        location: "Marché Jean-Talon, Montreal",
        attendance: 645,
        capacity: 800,
        price: 60
    },
    {
        id: 6,
        image_url: 'music.jpg',
        category: 'Musique',
        title: "Festival de Jazz à Montreal",
        description: "Un festival de jazz exceptionnel avec des artistes internationaux. Profitez de trois jours de musique live...",
        date: "15 juillet 2025 à 19:00",
        location: "Place des Arts, Montreal",
        attendance: 342,
        capacity: 500,
        price: 45
    }


];
// ---------------------------------------------


app.get("/", (req, res) => {
    // --- 2. Passer le tableau d'événements au template EJS ---
    res.render("home", {
        title: 'Événements',
        events: events
    })
=======
app.get("/", async (req, res) => {
    res.render("home")
>>>>>>> 3b99350a4ef580b381901049b4d091ed88125d7d
})

app.listen(3000, () => {
    console.log('server running http://localhost:3000')
})

