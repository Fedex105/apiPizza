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
    conn.query("SELECT * FROM orders", (err, rows) => {
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
    conn.query("SELECT * FROM orders WHERE idOrders=" + id, (err, rows) => {
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

module.exports = {
    returnPizza : returnPizza,
    returnOrders : returnOrders,
    returnOrder : returnOrder,
    placeOrder : placeOrder,
  }