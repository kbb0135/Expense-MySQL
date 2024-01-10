const express = require('express'); //initializing express
//using excpress to map those routes
const router = express.Router()
const {AddExpense} = require("../models")
const {validateToken} = require("../Middleware/Auth")

//API end point calls
router.get("/",validateToken, async(req, res)=> {
    //sending the whole table data 
    //in order to send the whole data from the table
    //we can use sequelize findALL
     const expenseData = await AddExpense.findAll();
    res.json(expenseData)
})

//For the post,we have to first initialize the path to access the models that we have created
//Destructure the file or table created using const {name} = require("path")
//after that send the body to as name.create(bodyName)
//parsing is required for json file to be formatted using app.use(express.json())
router.post("/",validateToken, async(req, res)=> {
    try {
        const expenseAdd = req.body;
    await AddExpense.create(expenseAdd)
    res.json(expenseAdd);
    }
    catch(error) {
        console.log("Error adding expense:", error);
        res.status(500).json({ error: "Failed to add expense" });
    }
    

    //dummy data posted using insomnia
// {
// 	"expenseName":"Walmrt",
// 	"category": "Grocery",
// 	"price":12,
// 	"email":"test@test.com"
// }

})

//exporting the file to index folder

module.exports = router;


