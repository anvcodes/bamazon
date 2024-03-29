var inquirer= require("inquirer");
var mysql = require('mysql');
var Table = require("cli-table");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "LMR0305",
  database: "bamazon"
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
        var displayTable= new Table({
            head : ["id", "product_name","department_name", "stock_quantity", "price"],
            colWidth: [10,20,20,20,20]
        });

        for(var i=0; i< res.length;i++){
            displayTable.push([
                res[i].id,
            res[i].product_name,
            res[i].department_name,
            res[i].stock_quantity,
            res[i].price
            ])
    }
    
    inquireProduct(console.log(displayTable.toString()));
    
})


function inquireProduct(res){
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Please enter ID of item you would like to purchase."
        },
        {
            name: "stock_quantity",
            type: "input",
            message: "how many units would you like to purchase"
        }
    ]).then(function(res){
        var userQuantity= res.stock_quantity;
        var itemId= res.id;
        processOrder(userQuantity,itemId);
    });
};



function processOrder(itemId, userQuantity){
    con.query("SELECT * FROM products WHERE id=" + itemId, function(err, res){
        if(err){
            console.log(err);
        }
        if (userQuantity <= res[0].stock_quantity){
            var costTotal= res[0].price * userQuantity;
            console.log("Item is in stock");
            console.log("Your total cost for " + userQuantity + " " + res[0].product_name + " is " + costTotal + " . ");

            "UPDATE products SET ? WHERE ?",
            [
                {
                    stock_quantity: res[itemId-1].stock_quantity - userQuantity
                },
                {
                    itemId: itemId
                }
            ]
            // con.query(
			// 	"UPDATE products WHERE item_id=?" + itemId + "SET stock_quantity = stock_quantity " - userQuantity 
			// );
        }else {
			console.log(
				"Sorry we do not have enough " + res[0].product_name + "to complete your order."
            );
        }
        // start();
    });
}

}


// start();

