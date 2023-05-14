var express = require('express');
var router = express.Router();

const Manga = require('../models/manga')
const Genre = require('../models/genre')

router.post("/createManga", async function (req, res) {
    // req.body.genres -> todos os generos já alinhados
    const manga = new Manga({
        _id: req.body.mal_id,
        url: req.body.url,
        images: req.body.images,
        title: req.body.title,
        title_english: req.body.title_english,
        title_japanese: req.body.title_japanese,
        type: req.body.type,
        chapters: req.body.chapters,
        volumes: req.body.volumes,
        status: req.body.status,
        synopsis: req.body.synopsis,
        littleText: req.body.background, // background - texto representativo
        published: req.body.published,
        score: req.body.score,
        //characters: [{ type: Schema.Types.ObjectId, ref: 'Characters' }],
        //genres: [{ type: Schema.Types.ObjectId, ref: 'Genres' }],
        //authors: [{ type: Schema.Types.ObjectId, ref: 'Authors' }],
    });

    console.log(manga)

    try {
        const userSaved = await manga.save();
        res.status(201).json({
            msgSuccess: "Manga salvo com sucesso.",
            objSaved: manga,
        });
    } catch (e) {
        return res.status(500).json({
            myErrorTitle: "Um erro aconteceu na hora de salvar.",
            myError: e,
        });
    }
});

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

module.exports = router;