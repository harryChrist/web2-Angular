var express = require('express');
var router = express.Router();

const Author = require('../models/author')
const Manga = require('../models/manga')

router.post("/createAuthor", async function (req, res) {
    console.log(req.body)
    const author = new Author({
        _id: req.body.mal_id,
        name: req.body.name,
        images: req.body.images,
        birthday: req.body.birthday,
        about: req.body.about
    });

    console.log(author.name)

    try {
        const userSaved = await author.save();
        res.status(201).json({
            msgSuccess: "Genero salvo com sucesso.",
            objSaved: userSaved,
        });
    } catch (e) {
        return res.status(500).json({
            myErrorTitle: "Um erro aconteceu na hora de salvar.",
            myError: e,
        });
    }
});

module.exports = router;