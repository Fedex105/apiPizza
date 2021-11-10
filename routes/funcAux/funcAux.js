let mysql = require("mysql");
let conn = mysql.createConnection({
  host:"127.0.0.1",
  user:"root",
  password:"root",
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
    conn.query("SELECT * FROM orders WHERE idOrders=" + id, (err, rows) => {
        if(err){
            reject(err);
        } else {
            resolve(rows);
        }
    });
})
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


module.exports = {
    returnPizza : returnPizza,
    returnOrders : returnOrders,
    returnOrder : returnOrder,
    placeOrder : placeOrder,
    orderFormat : orderFormat
  }