// Add an expense

function add_expense(uid, expenseid, amount, description){
	var url = "http://localhost:5000/addexpense";

	var data = {};
	data.user_id = uid;
	data.expense_id  = expenseid;
	data.expense_amount = amount;
	data.expense_description = description;
	var json = JSON.stringify(data);

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "201") {
			console.table(users);
		} else {
			console.error(users);
		}
	}
	xhr.send(json);


}


// View all expenses
function view_expense(){
	

	var url  = "http://127.0.0.1:5000/expenses";
	var xhr  = new XMLHttpRequest()
	xhr.open('GET', url, true)
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.table(users);
			console.log(users);
		} else {
			console.error(users);
		}
	}
	xhr.send(null);

	return users;
}

// Update an expense
function update_expense(uid, expenseid, amount, description){

	var url = "http://localhost:5000/updateexpense";

	var data = {};
	data.id = uid;
	data.expense_id  = expenseid;
	data.expense_amount = amount;
	data.expense_description = description;
	var json = JSON.stringify(data);

	var xhr = new XMLHttpRequest();
	xhr.open("PUT", url, true);
	xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.table(users);
		} else {
			console.error(users);
		}
	}
	xhr.send(json);

}

// deleting expense
function deleteExpense(id){

	var url = "http://localhost:5000/deleteexpense";
	var xhr = new XMLHttpRequest();
	xhr.open("DELETE", url+id, true);
	xhr.onload = function () {
		var users = JSON.parse(xhr.responseText);
		if (xhr.readyState == 4 && xhr.status == "200") {
			console.table(users);
		} else {
			console.error(users);
		}
	}
	xhr.send(null);
}









// ------------------------------------------------------------------------------------S-------------

/**
 * 
 * Post request to add a user
var yourUrl = "http://localhost:5000/add";
var xhr = new XMLHttpRequest();
xhr.open("POST", yourUrl, true);
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.send(JSON.stringify({
	"name":"Siddhi",
	"email":"siddhi@gmail.com",
	"pwd":"pwd1"
}));
 */


/**
 * getting all users
 */

// 1. Create a new XMLHttpRequest object
// let xhr = new XMLHttpRequest();
// xhr.open('GET', 'http://127.0.0.1:5000/users');
// xhr.send();
// xhr.onload = function() {
//     if (xhr.status != 200) { // analyze HTTP status of the response
//       alert(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
//     } else { // show the result
//       console.log(`Done, got ${xhr.response.length}  bytes ${xhr.response})`); // response is the server response
//     }
//   };
  


// 2. Configure it: GET-request for the URL /article/.../load

// 3. Send the request over the network

// 4. This will be called after the response is received

// xhr.onprogress = function(event) {
//   if (event.lengthComputable) {
//     alert(`Received ${event.loaded} of ${event.total} bytes`);
//   } else {
//     alert(`Received ${event.loaded} bytes`); // no Content-Length
//   }

// };

// xhr.onerror = function() {
//   alert("Request failed");
// };


 // Delete a user
// var url = "http://localhost:5000/delete";
// var xhr = new XMLHttpRequest();
// xhr.open("DELETE", url+'/3', true);
// xhr.onload = function () {
// 	var users = JSON.parse(xhr.responseText);
// 	if (xhr.readyState == 4 && xhr.status == "200") {
// 		console.table(users);
// 	} else {
// 		console.error(users);
// 	}
// }
// xhr.send(null);





/**
 * updating
 */

// 
// var url = "http://localhost:5000/update";

// var data = {
//    "id":3,
//    "name":"Soumitra Roy",
//    "email":"contact@roytuts.com",
//    "pwd":"pwd"
// };

// //  var xhr = new XMLHttpRequest();
// xhr.open("PUT", url, true);
// xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
// xhr.onload = function () {
//     var users = xhr.response;
//     if (xhr.readyState == 4 && xhr.status == "200") {
//         console.table(users);
//     } else {
//         console.error(users);
//     }
// } 
// xhr.send(data);
