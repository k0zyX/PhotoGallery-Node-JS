const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const { path } = require('express/lib/application');
const Photo = require('./models/Photo');
const fs = require('fs');
const app = express();
const port = 3000;

// mongoose connect
mongoose.connect('mongodb://localhost/photo-gallery', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method',{
    methods:['POST','GET']
}));

// Routes
app.get('/', async (req, res) => {
    const photos = await Photo.find({}).sort('-dateCreated');
    res.render('index', {
        photos,
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/photos/:id', async (req, res) => {
    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
        photo,
    });
});

app.get('/photos/edit/:id', async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    res.render('edit', {
        photo,
    });
});

app.put('/photos/:id', async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    photo.title = req.body.title;
    photo.description = req.body.description;
    photo.save();
    res.redirect(`/photos/${req.params.id}`)
});

app.delete('/photos/:id', async (req, res) =>{
    const photo = await Photo.findOne({_id: req.params.id});
    let deletedImage = __dirname + "/public" + photo.image;
    fs.unlinkSync(deletedImage);
    await Photo.findByIdAndRemove(req.params.id);
    res.redirect("/");
})

app.get('/add', (req, res) => {
    res.render('add');
});
app.post('/photos', async (req, res) => {
    const uploadDir = 'public/uploads';

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let uploadedImage = req.files.image;
    let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;

    uploadedImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadedImage.name,
        });
        res.redirect('/');
    });
});

app.listen(port, () => {
    console.log(`Server started at ${port} port`);
});
