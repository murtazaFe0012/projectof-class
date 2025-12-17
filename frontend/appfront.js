const express = require("express")
const app = express()


// middlewares //test
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')


app.get("/", async (req, res) => {
    try{
        const truc = await fetch("http://localhost:4000/events/");
        const data = await truc.json();
        res.render("home", {data});
    } catch (err){
        console.error(err);
        res.status(500).send("Erreur serveur");
    }
})

app.listen(3000, () => {
    console.log('server running http://localhost:3000')
})
//branche kyks