var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');

const Manga = require('../models/manga')
const Genre = require('../models/genre')
const Author = require('../models/author')

router.get("/getMangas", async function (req, res) {
  try {
    Manga.aggregate([
      {
        $match: {} // Este estágio $match irá retornar todos os documentos da coleção 'mangas'
      },
      {
        $lookup: {
          from: 'genres',
          localField: 'genres',
          foreignField: '_id',
          as: 'genre_info'
        }
      },
      {
        $lookup: {
          from: 'authors',
          localField: 'authors',
          foreignField: '_id',
          as: 'author_info'
        }
      }
    ]).exec((err, mangas) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(mangas)
      return res.status(200).json({
        myMsgSucess: "Mensagem recuperada com sucesso.",
        mangas: mangas,
      });
    });


  } catch (e) {
    return res.status(500).json({
      myErroTitle: "Um erro aconteceu na hora de buscar a mensagem",
      myError: e,
    });
  }
});

router.delete("/deleteMangaById/:id", async function (req, res) {
  const itemId = req.params.id

  try {
    Manga.findOneAndRemove({ _id: itemId }, (err, manga) => {
      if (err) {
        console.error('Erro ao excluir o mangá:', err);
        res.status(500).json({ message: 'Erro ao excluir o mangá' });
      } else {
        if (manga) {
          console.log('Mangá excluído:', manga);
          res.json({ message: 'Mangá excluído com sucesso' });
        } else {
          console.log('Mangá não encontrado');
          res.status(404).json({ message: 'Mangá não encontrado' });
        }
      }
    });
  } catch (e) {
    return res.status(500).json({
      myErroTitle: "Um erro aconteceu na hora de buscar a mensagem",
      myError: e,
    });
  }
});

router.get("/getMangaById/:id", async function (req, res) {
  const itemId = req.params.id

  try {
    Manga.findOne({ _id: Number(itemId) }, (err, item) => {
      if (err) {
        console.error('Erro ao buscar o item:', err);
      } else {
        if (item) {
          return res.status(200).json({
            myMsgSucess: "Mensagem recuperada com sucesso.",
            mangas: item,
          });
        }
      }
    })
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

  try {
    // Verificar se existe
    Author.find({ _id: { $in: authorIds } }, async (err, autoresEncontrados) => {
      if (err) {
        console.error(err);
        return;
      }

      // Itera sobre os autores encontrados e armazena suas IDs no array
      autoresEncontrados.forEach((autor) => {
        autoresEncontradosIDs.push(autor._id);
      });

      console.log("IDs dos autores encontrado s:");
      console.log(autoresEncontradosIDs);


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
        price: req.body.price,
        quantity: req.body.quantity,
        //characters: [{ type: Schema.Types.ObjectId, ref: 'Characters' }],
        //genres: [{ type: Schema.Types.ObjectId, ref: 'Genres' }],
        authors: autoresEncontradosIDs,
      });
      console.log(manga)

      const userSaved = await manga.save();
      res.status(201).json({
        msgSuccess: "Manga salvo com sucesso.",
        objSaved: manga,
      });
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