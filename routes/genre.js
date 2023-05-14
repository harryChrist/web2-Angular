var express = require('express');
var router = express.Router();

const Genre = require('../models/genre')
const Manga = require('../models/manga')

router.post("/createGenre", async function (req, res) {
    const genre = new Genre({
        _id: req.body.mal_id,
        name: req.body.name,
    });

    console.log(genre)

    try {
        const userSaved = await genre.save();
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

router.get("/getGenres", async function (req, res) {

    let manga;
    Manga.findById(11)
        .populate('genres')
        .exec(function (err, manga) {
            if (err) {
                // Tratar o erro, se houver
                console.log(err)
            } else {
                // Os gêneros associados ao manga estão populados e disponíveis
                console.log(manga.genres);
                manga = manga.genres
            }
        });

        console.log(manga)

    try {
        res.status(201).json({
            msgSuccess: "Genero salvo com sucesso.",
            objSaved: manga,
        });
    } catch (e) {
        return res.status(500).json({
            myErrorTitle: "Um erro aconteceu na hora de carregar.",
            myError: e,
        });
    }
});

module.exports = router;