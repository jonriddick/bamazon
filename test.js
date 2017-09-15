var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Sundrop7@",
  database: "bamazon"
});

connection.query("SELECT bamazon_id, product, price FROM items", function(err, res) {
	if (err) throw err;

	for (var i = 0; i < res.length; i++) {
          console.log("ID #: " + res[i].bamazon_id + " - Product: " + res[i].product + " - Price: " + res[i].price);
        }
	// console.log(res);
	
//function which prompts the user for what action they should take
function start() {
  inquirer
	.prompt([
	      {
	        name: "number",
	        type: "input",
	        message: "What is the item # of the product you'd like to purchase?"
	      },
	      {
	        name: "category",
	        type: "input",
	        message: "How many would you like to purchase?"
	      }]).then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
            console.log("You owe: $" + answer.number);






    // .prompt({
    //   name: "productNumber",
    //   type: "input",
    //   message: "What is the item # of the product you'd like to purchase?",
    //   validate: function(value) {
    //       if (isNaN(value) === false || value < 10) {
    //         return true;
    //       }
    //       return false;
    //   }}).then(function(answer){
    // 	.prompt({
	   //    name: "productQuantity",
	   //    type: "input",
	   //    message: "How many would you like to purchase?",
    // 	}})

    	  connection.end();
    });
    // .then(function(answer) {
    //   // based on their answer, either call the bid or the post functions
    //   if (answer.postOrBid.toUpperCase() === "POST") {
    //     postAuction();
    //   }
    //   else {
    //     bidAuction();
    //   }
    // });
}
start();

	//connection.end();
});