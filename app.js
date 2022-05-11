const express = require('express');
const ejs = require('ejs');
const { path } = require('express/lib/application');

const app = express();
const port = 3000;

app.use(express.static("public"));
app.set("view engine","ejs");

app.get('/', (req, res) => {
    res.render("index");
});

app.listen(port, () => {
    console.log(`Server started at ${port} port`);
});