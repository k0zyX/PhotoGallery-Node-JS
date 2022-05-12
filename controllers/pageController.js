const Photo = require('../models/Photo');

// You can get more pages if you want that way.
// I want it that way ...

exports.getAboutPage = (req, res) => {
    res.render('about');
}

exports.getAddPage = (req, res) => {
    res.render('add');
}

// Photo Edit Page
exports.getEditPage = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    res.render('edit', {
        photo,
    });
}