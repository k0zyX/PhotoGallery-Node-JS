const express = require('express');
const ejs = require('ejs');
const { path } = require('express/lib/application');

const app = express();
const port = 3000;

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/add', (req, res) => {
    res.render('add');
});

app.post('/photos', (req, res) => {
    console.log(req.body);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server started at ${port} port`);
});
