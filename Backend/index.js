const express = require('express')
const app = express();
const PORT_NO = 7000;   //port number client will send or fetch data from
//For the initialiation of the table
const db= require("./models")   //iterate all the files to check or create tables
app.use(express.json()) //parsing the json body 

//defines routing
//importing route location from files
const addExpense = require('./routes/AddExpense')
// //we pass two parameters for routing 
// //app.use('/url-that-u-define", path-of-the-route')
app.use("/add", addExpense)



//initialize table if not created
//will return a promise if successful

db.sequelize.sync().then(()=> {
    //making sure that server or backend will only work when there is a table
    app.listen(PORT_NO, ()=>{
        console.log('Server running on port ',PORT_NO);
    })
})
// app.listen(PORT_NO, ()=>{
//     console.log('Server running on port ',PORT_NO);
// })