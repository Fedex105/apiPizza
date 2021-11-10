var express = require('express');
var router = express.Router();
var funcAux = require("./funcAux/funcAux")


/* GET users listing. */
router.get('/', function(req, res, next) {

    funcAux.returnPizza()
    .then(pizzas => {
        res.json(pizzas)
    })
    .catch(err => {
      console.log(err)
      res.json({error:"Hubo un error al consultar la DB. Intentelo mas tarde"});
    })

});

module.exports = router;
