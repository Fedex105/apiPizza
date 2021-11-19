require('dotenv').config()
let mysql = require("mysql");
console.log(process.env)
let conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database:"new_schema"
})
conn.connect();

function returnPizza(){
    return new Promise(function(resolve, reject){
      conn.query("SELECT * FROM pizza", (err, rows) => {
          if(err){
              reject(err);
          } else {
              resolve(rows);
          }
      });
  })
}

function returnOrders(){
  return new Promise(function(resolve, reject){
    conn.query("SELECT orders.idOrders, orders.orderDate, orders.orderStatus, orders.orderName, orders.orderPhone, pizza.pizzaName, pizza.pizzaPrice, order_items.Quantity FROM orders JOIN order_items ON orders.idOrders=order_items.idOrder JOIN pizza ON order_items.idPizza=pizza.idPizza", (err, rows) => {
        if(err){
            reject(err);
        } else {
            resolve(rows);
        }
    });
})
}

function returnOrder(id){
  return new Promise(function(resolve, reject){
    conn.query("SELECT orders.idOrders, orders.orderDate, orders.orderStatus, orders.orderName, orders.orderPhone, pizza.pizzaName, pizza.pizzaPrice, order_items.Quantity FROM orders JOIN order_items ON orders.idOrders=order_items.idOrder JOIN pizza ON order_items.idPizza=pizza.idPizza WHERE idOrders=" + id, (err, rows) => {
        if(err){
            reject(err);
        } else {
            resolve(rows);
        }
    });
})
}

function placeOrder(order){
    return new Promise(function(resolve, reject){
        conn.beginTransaction(function(err) {
            if (err) { throw err; }
            var newOrder = [1, order.orderName, getDate(),order.orderPhone]
            conn.query('INSERT INTO orders (`orderStatus`, `orderName`, `orderDate`, `orderPhone`) VALUE (?, ?, ?, ?)', newOrder,function (error, results, fields) {
                    if (error) {
                        return conn.rollback(function() {
                        reject(err);
                        });
                    } else {resolve(results.insertId)}
                var id = results.insertId;
        
                conn.query('INSERT INTO order_items (`idOrder`, `idPizza`, `Quantity`) VALUE ?',[pizzaItems(order.orderItems, id)] , function (error, results, fields) {
                        if (error) {
                        return conn.rollback(function() {
                        throw error;
                    });
                    }
                    conn.commit(function(err) {
                    if (err) {
                        return conn.rollback(function() {
                        throw err;
                        });
                    }
                    console.log('success!');
                    });
                });
            });
        });
    })
}

function orderSent(id){
    return new Promise(function(resolve, reject){
      conn.query("UPDATE orders SET orderStatus=0 WHERE idOrders=" + id, (err, rows) => {
          if(err){
              reject(err);
          } else {
              resolve(rows);
          }
      });
  })
  }


function pizzaItems(items,id){
    var itemArray = []
        items.map(item => {
        var formatedArray = [id, item.idPizza, item.Quantity]
        itemArray.push(formatedArray)
    })
    return itemArray
}

function orderFormat(orders){ 
  formatedOrdersRaw = [];
  formatedOrders = [];
  usedId = [];
  for (order of orders){
        orderForm = {
            idOrders: order.idOrders,
            orderStatus: order.orderStatus,
            orderName: order.orderName,
            orderDate: order.orderDate,
            orderPhone: order.orderPhone,
            orderItems: { pizzaName :order.pizzaName,
                          pizzaPrice :order.pizzaPrice,
                          Quantity :order.Quantity
                        }
        }
        formatedOrdersRaw.push(orderForm);  
    }

  for (order of formatedOrdersRaw){
      orderId = order.idOrders;
      if (!(usedId.includes(orderId))){
          orderForm = {
              idOrders: orderId,
              orderStatus: order.orderStatus,
              orderName: order.orderName,
              orderDate: order.orderDate,
              orderPhone: order.orderPhone,
              orderItems: []
          }
          usedId.push(orderId);
          formatedOrders.push(orderForm);  
      }
    }
  
    for (order of formatedOrders){
      filteredOrder = formatedOrdersRaw.filter(x => x.idOrders === order.idOrders);
      orderItems = filteredOrder.map(x => {
          return x.orderItems
      })
      order.orderItems = orderItems;
    } 

    return formatedOrders
  }

function getDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
    dd = '0' + dd;
    }

    if (mm < 10) {
    mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd
    return today
}

module.exports = {
    returnPizza : returnPizza,
    returnOrders : returnOrders,
    returnOrder : returnOrder,
    placeOrder : placeOrder,
    orderFormat : orderFormat,
    orderSent : orderSent
  }