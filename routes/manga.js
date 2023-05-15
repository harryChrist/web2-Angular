var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const Manga = require('../models/manga')
const Genre = require('../models/genre')
const Author = require('../models/author')

router.get("/getMangas", async function (req, res) {
    try {
      const mangas = await Manga.find().then((itens) => {
        console.log('Lista de itens:', itens);
        // Faça algo com a lista de itens aqui
      })
      .catch((error) => {
        console.error('Erro ao recuperar a lista de itens:', error);
      });

      return res.status(200).json({
        myMsgSucess: "Mensagem recuperada com sucesso.",
        objSMessageSRecuperadoS: messagesComplete,
      });
    } catch (e) {
      return res.status(500).json({
        myErroTitle: "Um erro aconteceu na hora de buscar a mensagem",
        myError: e,
      });
    }
  });

router.post("/createManga", async function (req, res) {
    // req.body.genres -> todos os generos já alinhados
    var generoIds = req.body.genres.map(genero => genero.mal_id);
    var authorIds = req.body.authors.map(author => author.mal_id);

    var autoresEncontradosIDs = [];

    // Verificar se existe
    Author.find({ _id: { $in: authorIds } }, (err, autoresEncontrados) => {
        if (err) {
            console.error(err);
            return;
        }

        // Itera sobre os autores encontrados e armazena suas IDs no array
        autoresEncontrados.forEach((autor) => {
            autoresEncontradosIDs.push(autor._id.toString());
        });

        console.log("IDs dos autores encontrado s:");
        console.log(autoresEncontradosIDs);
    });

    // Adicionar Manga
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
        genres: generoIds,
        //characters: [{ type: Schema.Types.ObjectId, ref: 'Characters' }],
        //genres: [{ type: Schema.Types.ObjectId, ref: 'Genres' }],
        authors: autoresEncontradosIDs,
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