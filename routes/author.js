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

router.get("/getAuthorById/:id", async function (req, res) {
    const itemId = req.params.id
  
    try {
      Author.findOne({ _id: Number(itemId) }, (err, item) => {
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

module.exports = router;