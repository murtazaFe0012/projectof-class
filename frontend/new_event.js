const express = require("express")
const app = express()


// middlewares
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')


app.get("/", (req, res) => {
    // --- 2. Passer le tableau d'événements au template EJS ---
    res.render("home", {
        title: 'Événements',
        events: events
    })
})

app.listen(3000, () => {
    console.log('server running http://localhost:3000')
})

