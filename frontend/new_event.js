const express = require("express")
const app = express()


// middlewares //test
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')


app.get("/", async (req, res) => {
    res.render("views/home")
})

app.listen(3000, () => {
    console.log('server running http://localhost:3000')
})
//branche kyks