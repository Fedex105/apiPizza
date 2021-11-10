var express = require('express');
var router = express.Router();
var funcAux = require("./funcAux/funcAux")


/* GET users listing. */
router.get('/', function(req, res, next) {

  funcAux.returnOrders()
  .then(orders => {
      res.json(orders)
  })
  .catch(err => {
    console.log(err)
    res.json({error:"Hubo un error al consultar la DB. Intentelo mas tarde"});
  })

});

router.post('/', function(req, res, next) {

  let order = req.body

  funcAux.placeOrder(order)

});

router.get('/:id', function(req, res, next) {

  let id = req.params.id

  funcAux.returnOrder(id)
  .then(order => {
      res.json(order)
  })
  .catch(err => {
    console.log(err)
    res.json({error:"Hubo un error al consultar la DB. Intentelo mas tarde"});
  })
});

module.exports = router;
