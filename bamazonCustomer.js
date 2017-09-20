var mysql = require("mysql");
var inquirer = require ("inquirer");

var connection = mysql.createConnection({
	host: "localhost",
	port: "3306",
	user: "root",
	password: "Sundrop7@",
	database: "bamazon"
});

//var itemsArray = [];


function displayInventory(){
	console.log("-------------------------------------");
	console.log("++++      Welcome to Bamazon      ++++");
	console.log("-------------------------------------");
	console.log("++++      Current Inventory      ++++");
	console.log("-------------------------------------");
	connection.query("SELECT bamazon_id, product, price, quantity FROM items", function(err, res){
		for (var i = 0; i < res.length; i++) {
			//itemsArray.push(res[i]bamazon_id);
          console.log("ID #: " + res[i].bamazon_id + " - Product: " + res[i].product + " - Price: $" + res[i].price + " - Quantity on hand: " + res[i].quantity);
        };
    // })
	console.log("-------------------------------------");

	inquirer.prompt([
	      {
	        name: "id",
	        type: "input",
	        message: "What is the item # of the product you'd like to purchase?"
	        // validate: function(value){
         //        if(isNaN(value)==false){   
         //            return true;
         //        } else {
         //            return false;
         //        }
         //    }
	      },
	      {
	        name: "qty",
	        type: "input",
	        message: "How many would you like to purchase?"
	        // validate: function(value){
         //        if(isNaN(value)==false){   
         //            return true;
         //        } else {
         //            return false;
         //        }
         //    }
	      }]).then(function(ans){
	      	var whatToBuy = (ans.id)-1;
      		var howMuchToBuy = parseInt(ans.qty);
     		var grandTotal = parseFloat(((res[whatToBuy].price)*howMuchToBuy).toFixed(2));

      //check if qty is sufficient
		    if(res[whatToBuy].quantity >= howMuchToBuy){
		        //after purchase, updates quantity in the items table
		        connection.query("UPDATE items SET ? WHERE ?", [
		        {quantity: (res[whatToBuy].quantity - howMuchToBuy)},
		        {bamazon_id: ans.id}
		        ], function(err, result){
		            if(err) throw err;
		            console.log("Success! Your total is $" + grandTotal.toFixed(2) + ". Thanks for your business!");
		        	reprompt();
		        });
		        

		        // connection.query("SELECT * FROM Department", function(err, depRes){
		        //   if(err) throw err;
		        //   var index;
		        //   for(var i = 0; i < depRes.length; i++){
		        //     if(depRes[i].Department === res[whatToBuy].Department){
		        //       index = i;
		        //     }
		        //   }
		          
		        //   //updates totalSales in departments table
		        //   connection.query("UPDATE Department SET ? WHERE ?", [
		        //   {TotalSales: depRes[index].TotalSales + grandTotal},
		        //   {Department: res[whatToBuy].Department}
		        //   ], function(err, depRes){
		        //       if(err) throw err;
		        //       //console.log("Updated Dept Sales.");
		        //   });
		        // });


		    } else {
		    	console.log("Oops! We don't have that many.");
		    	reprompt();
		    }

		    

		  })

	})

}

//asks if they would like to purchase another item
function reprompt(){
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to purchase another item?"
  }]).then(function(ans){
    if(ans.reply){
      displayInventory();
    } else{
      console.log("Y'all come back!");
    }
  });
}


displayInventory();
	 