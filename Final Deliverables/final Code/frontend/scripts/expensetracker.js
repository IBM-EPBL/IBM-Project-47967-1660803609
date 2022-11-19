// add expense button reference
var btnAddExpense = document.querySelector("#addExpense");

// elements reference
var inputAmount = document.querySelector("#amount");
var inputDescription = document.querySelector("#description");
var totalAmount = document.querySelector("#total");
var errorAmountMessage = document.querySelector("#errorAmount");
var errorDescriptionMessage= document.querySelector("#errDesc");

//  expenseData reference where data will be displayed
var expenseDataEl = document.querySelector("#expenseData")

var counter =0;

//array for all expense objects
var allExpenses=[];
var totalExpense=0;

function retrieve(){
    console.log("called")
    allExpenses =[]
    var users;
    var url  = "http://127.0.0.1:5000/expenses";
    var xhr  = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.onload = function () {
        users = JSON.parse(xhr.responseText);
        updateDisplay(users)
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(users);
            console.log(users[0][0]);
            console.log(users.length);
        } else {
            console.error(users);
        }
    }
    xhr.send(null);
    
}

function updateDisplay(users){
    for(var i = 0; i < users.length;i++ ){
        
        var expenseItem ={};    
        expenseItem.amount = users[i][2];
        expenseItem.description = users[i][3];
        expenseItem.moment = new Date();
        expenseItem.id = users[i][1];
        totalExpense +=expenseItem.amount;
        allExpenses.push(expenseItem)
        counter = expenseItem.id;
    }
    totalAmount.innerHTML = totalExpense;
    //updating display
    renderList(allExpenses);
}

//Event listener to add expense
btnAddExpense.addEventListener("click",()=>{
       
    var isValidAmount = checkAmount();
    var isValidDescription = checkDescription();

    if(isValidAmount && isValidDescription){
        
        if(btnAddExpense.value=="Add Expense"){
            
            console.log("Adding")
            addExpense();
        }
        else
            updateExpense();
    }

});

// Check if amount is valid
function checkAmount(){

    if (!Number.isNaN(parseInt(inputAmount.value))) {
        return true;
    } else {
        errorAmountMessage.innerHTML="Enter a valid number";
        clearInputElements();
        return false;
    }
        
}

// Check if description is valid
function checkDescription(){
    if(inputDescription.value==""){
        console.log("hi")
        errorDescriptionMessage.innerHTML="Enter description";
        return false;
    }
    else{
        return true;
    }
}

// add expense function
function addExpense(){

    // object declaration
    var expenseItem ={};
    counter ++;
    //reading values from amount and description
    const amountValue = inputAmount.value;
    const descriptionValue = inputDescription.value;

    // adding the values to expenseItem object
    expenseItem.amount = amountValue;
    expenseItem.description = descriptionValue;
    expenseItem.moment = new Date();
    expenseItem.id = counter;

    //pushing it to allExpenses array
    allExpenses.push(expenseItem);

    //updating display
    renderList(allExpenses);

    // totalcalculating total amount
    totalExpense += parseInt(amountValue);
    totalAmount.innerHTML = totalExpense;

    //clearing input
    clearInputElements();
    clearErrorMessages();

    // Db adding
    var url = "http://localhost:5000/addexpense";

    var data = {};
    data.user_id = 11;
    data.expense_id  = counter;
    data.expense_amount = amountValue;
    data.expense_description = descriptionValue;
    var json = JSON.stringify(data);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
    xhr.onload = function () {
        var users = xhr.response;
        if (xhr.readyState == 4 && xhr.status == "201") {
            console.table(users);
        } else {
            console.error(users);
        }
    }
    xhr.send(json);

}


function clearInputElements(){
    inputAmount.value="";
    inputDescription.value="";

}

function clearErrorMessages(){
    errorAmountMessage.innerHTML="";
    errorDescriptionMessage.innerHTML="";
}

// function to update the display of expenses list
function renderList(arr){
    console.log("1");
    var allExpenseHtml = arr.map(expense => createListItem(expense));
    var joinedAllExpenseHtml= allExpenseHtml.join(' ');
    expenseDataEl.innerHTML=joinedAllExpenseHtml;
}

// function to create individual tile of expense info
function createListItem({description,amount,moment,id}){
    return `
    <li class="list-group-item d-flex justify-content-between">
            <div class="d-flex flex-column">
               Rs. ${amount}
                <small class="text-muted">${description} </small>
            </div>
            <div>
                    <button 
                    type="button" 
                    class="btn btn-outline-secondary btn-sm"
                    onclick="updateItem(${id})"
                    >
                Update
                </button>
                <button 
                    type="button" 
                    class="btn btn-outline-danger btn-sm"
                    onclick="deleteItem(${id})"
                    >
                    Delete
                </button>
            </div>
        </li>
    `;
}

var update_id;
function updateItem(id){
    btnAddExpense.value= "Update Expense";
    update_id = id;

}

function updateExpense(){
    console.log("updating expense")

    var url = "http://localhost:5000/updateexpense";

    var data = {};
    data.id = 11;
    data.expense_id  = update_id;
    data.expense_amount = inputAmount.value;
    data.expense_description = inputDescription.value;
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

    clearInputElements();
    clearErrorMessages();
    setTimeout(retrieve(),3000)
    
    btnAddExpense.value = "Add Expense";
    console.log("TEST",allExpenses)
    console.log("TEST",allExpenses["0"])
    
    for(var i = 0; i < allExpenses.length; i++){
        console.log("TESTing")
        if(allExpenses[i].id==update_id){
            allExpenses[i].amount = data.expense_amount;
            allExpenses[i].descriptionValue = data.expense_description;
            total += allExpenses[i].amount;
            console.log("in")
        }
    }
    console.log(allExpenses)
    renderList(allExpenses)
}


// function to delete item
function deleteItem(id){


    //deleting from db
    var url = "http://localhost:5000/deleteexpense";
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url+'/'+id, true);
    xhr.onload = function () {
    	var users = JSON.parse(xhr.responseText);
    	if (xhr.readyState == 4 && xhr.status == "200") {
    		console.table(users);
    	} else {
    		console.error(users);
    	}
    }
    xhr.send(null);


    //updating total
    const delEl = allExpenses.filter(expense=>expense.id==id);
    const el = delEl.pop();
    totalExpense -= parseInt(el.amount);
    totalAmount.innerHTML = totalExpense;

    //deleting from array and displaying the new array
    const newArr= allExpenses.filter(expense => expense.id!== id);

    // updating allExpenses array
    allExpenses = newArr.map(expense => expense);

    //updating display
    renderList(newArr);
}



function getDateString(moment) {
    return moment.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}