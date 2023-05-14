var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const Manga = require('../models/manga')
const Genre = require('../models/genre')

router.post("/createManga", async function (req, res) {
    // req.body.genres -> todos os generos já alinhados
    var generoIds = [];
    for (let index = 0; index < req.body.genres.length; index++) {
        generoIds[index] = req.body.genres[index].mal_id;
    }

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
        genres: generoIds
        //characters: [{ type: Schema.Types.ObjectId, ref: 'Characters' }],
        //genres: [{ type: Schema.Types.ObjectId, ref: 'Genres' }],
        //authors: [{ type: Schema.Types.ObjectId, ref: 'Authors' }],
    });

    console.log(generoIds)
    console.log(manga)

    try {   
        const userSaved = await manga.save();
        res.status(201).json({
            msgSuccess: "Manga salvo com sucesso.",
            objSaved: manga,
        });
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            myErrorTitle: "Um erro aconteceu na hora de salvar.",
            myError: e,
        });
    }
});

module.exports = router;