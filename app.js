import express from "express"
import createHomePageTemplate from "./views/index.js"
import createListTemplate from "./views/list.js"
import createBookTemplate from "./views/book.js"
import createEditFormTemplate from "./views/edit.js"
import BOOKS_DATA from "./data/data.js"

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// create app
const app = express()
app.use(express.urlencoded({extended: false}))

// static assets
app.use(express.static('public'))

// routes
app.get('/', (req, res) => {
    res.send(createHomePageTemplate())
})

app.get('/books', (req, res) => {
    res.send(createListTemplate())
})

app.post('/books', (req, res) =>{
    const {title, author} = req.body
    const id = getRandomInt(1, 99999).toString()

    BOOKS_DATA.push({id, title, author})
    res.redirect('/books/' + id)
})

app.get('/books/:id', (req, res) => {
    const {id} = req.params
    const book = BOOKS_DATA.find((i) => i.id === id)
    res.send(createBookTemplate(book))
})

app.delete('/books/:id', (req, res) =>{
    const {id} = req.params
    const ids = BOOKS_DATA.findIndex(i =>{ i.id === id }) 
    BOOKS_DATA.splice(ids, 1)

    res.send()
})

app.get('/books/edit/:id', (req, res) => {
    const {id} = req.params
    const book = BOOKS_DATA.find((i) =>{return i.id === id}) 

    res.send(createEditFormTemplate(book))
})

// listen to port
app.listen(3000, ()=>{
    console.log('App listening on port 3000')
})