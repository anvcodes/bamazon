var inquirer= require("inquirer");
var mysql = require('mysql');
var Table = require("cli-table");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "LMR0305",
  database: "bamazonDB"
});

// connect to the mysql server and sql database
con.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
    });  

    function start(){
var   query = "SELECT * FROM products";
con.query(query, function(err, res){
     var disTable= new Table({
         head : ["id", "product_name","department_name", "price", "stock_quantity"],
         colWidth: [10,20,20,20,20]
     });

    for(var i=0; i< res.length;i++){
        disTable.push([
            res[i].id,
            res[i].product_name,
            res[i].department_name,
            res[i].stock_quantity,
            res[i].price
        ]);

        console.log(disTable.toString());
        inqPro();
    }

})

function inqPro(){
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Please enter ID of item you would like to purhcase.",
            filter: Number,
        },
        {
            name: "units",
            type: "input",
            message: "how many units would you like to purchase",
            filter: Number,
        },
    ]).then(function(answer){
        // var userQuantity= answer.units;
        // var itemId= answer.id;
        // processOrder(userQuantity,itemId);
    });
}

// function processOrder(){

// }
}

// function start(){

//     inquirer.prompt({
//         name: "ID",
//         type: "text",
//         message: "Welcome to Bamazon! What is the ID of the item youd like to buy?"
//     }
//     //  ,
//     // {   name: "units",
//     //     type: "input",
//     //     message: "How many units of this product would you like?",
//     // }
//     ).then(function selectID (answer){

//         // var userChoices= units.input;
//         var userId= ID.type;
//      var query= con.query(
//         "SELECT ? FROM products",
//         [
//             {
//                 id : userId
//          },
//          function(err, res) {
//             if (err) throw err;
//             console.log(res);
//             // Call readProducts AFTER the DELETE completes

//           }
//             // {
//             //     stock_quantity: userChoices
//             // }
//         ]);
//         console.log(query.sql);
//         selectID(answer);
//     });

// }
