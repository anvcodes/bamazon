// var Table = function (id, product_name, price, stock_quantity){
//     this.id=id,
//     this.product_name= product_name,
//     this.price= price
//     this.stock_quantity= stock_quantity
// }

// module.exports= Table;

var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "LMR0305",
	database: "bamazon",
});

con.connect(function(err) {
	if (err) throw err;
	console.log("connected as id: " + connection.threadId);
});

function inventory() {
	con.query('SELECT * FROM Products', function(err, res) {
		if (err) {
			console.log(err);
		}
		var invTable = new Table({
			head: ["id", "product_name","department_name", "stock_quantity", "price"],
			colWidths: [10, 25, 25, 10, 14],
		});
		for (i = 0; i < res.length; i++) {
			invTable.push([
				res[i].item_id,
				res[i].product_name,
				res[i].department_name,
				res[i].price,
				res[i].stock_quantity,
			]);
		}
		console.log(invTable.toString());
		updates();
	});
}

function updates(){
    inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: "How would you like to manage current inventory:",
            choices: ["Restock Iventory", "Add New Product", "Remove Existing Product"]
        },
    ])
    .then(function(answers) {
    
        switch (answers.action) {
            case "Restock Iventory":
                restock();
                break;
            case "Add New Product":
                add();
                break;
            case "Remove Existing Product":
                remove();
                break;
        }

    })
}

function restock(){
    inquirer
		.prompt([
			{
				name: "id",
				type: "input",
				message: "Please enter the Id of the item you'd like to restock",
			},
			{
				name: "quantity",
				type: "input",
				message: "What is the quantity of the item you'd like to restock",
			},
		]).then(function(answer){
            
        })
}