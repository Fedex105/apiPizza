# Getting Started with API pizza

Project created for ordering, and consulting orders an pizzas
Created with express.js with connection to SQL database

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Learn More

./pizzas--  .get returns menu of pizzas.\
./orders--  .get, recive all orders in JSON.\
./orders--  .post, place order and resolve id of the order.\
./orders/:id .get, recive specified order in JSON.\
./orders/setOrderRecived/:id .patch, set the orderStatus from true to false. Refering false to inactive order and true to active order.\
            
JSON format recived in .get

{\
idOrders: order.idOrders,\
orderStatus: order.orderStatus,\
orderName: order.orderName,\
orderDate: order.orderDate,\
orderPhone: order.orderPhone,\
orderItems:   
              [{\
              pizzaName :order.pizzaName,\
              pizzaPrice :order.pizzaPrice,\
              Quantity :order.Quantity\
              }]\
}
              
JSON format recived in .post 

{\
"orderName":"ordername",\
"orderPhone":"orderPhone",\
"orderItems":
        [{\
        "idPizza":"idPizza",\
        "Quantity":"Quantity"\
        }]\
}
