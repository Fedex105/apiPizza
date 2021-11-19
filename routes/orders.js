var express = require('express');
var router = express.Router();
var funcAux = require("./funcAux/funcAux")


router.get('/', function(req, res, next) {

  funcAux.returnOrders()
  .then(orders => {
      res.json(funcAux.orderFormat(orders))
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error:"Hubo un error al consultar la DB. Intentelo mas tarde"});
  })

});

router.post('/', function(req, res, next) {
    let order = req.body
    funcAux.placeOrder(order)
    .then(id => {
        res.json(id)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error:"Hubo un error al consultar la DB. Intentelo mas tarde"});
    })
});

router.get('/:id', function(req, res, next) {

  let id = req.params.id

  funcAux.returnOrder(id)
  .then(order => {
      let orderForm = funcAux.orderFormat(order)
      if(orderForm.length === 0){
        console.log("Error, inexistent order")
        res.status(404).json({error:"Hubo un error al consultar la DB. Intentelo mas tarde"});
        }else{
        res.json(orderForm[0])
        }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error:"Hubo un error al consultar la DB. Intentelo mas tarde"});
  })
});

router.patch('/setOrderRecived/:id', function(req, res, next) {
  let id = req.params.id
  funcAux.orderSent(id)
  .then(order => {
      res.json(order)
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({error:"Hubo un error al consultar la DB. Intentelo mas tarde"});
  })
});


module.exports = router;
