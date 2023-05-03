var express = require('express');
var router = express.Router();

var Message = require("../models/message"); // pegando o Schema Message do Banco


router.post('/', function (req, res, next) {
  var message = new Message({ // Criando baseado no conteudo da req
    content: req.body.content
  });
  message.save(function(err, result) {
    if(err) {
        return res.status(500).json({
            myErroTitle:"Um Erro aconteceu na hora do salvamento!",
            myError: err
        })
    }
    res.status(201).json({
        myMsgSucess: "Mensagem salva com sucesso",
        objMessageSave: result
    })
  })
})

module.exports = router; 