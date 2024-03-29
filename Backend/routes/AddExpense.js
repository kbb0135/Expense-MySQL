const express = require('express'); //initializing express
//using excpress to map those routes
const router = express.Router()
const { AddExpense } = require("../models")
const { validateToken } = require("../Middleware/Auth")

//API end point calls
router.get("/", validateToken, async (req, res) => {
    try {
        const id = await req.user.id
        const data = await AddExpense.findAll({ where: { UserId: id } })
        const expensesByMonth = {};
        data.forEach(expense => {
            const date = new Date(expense.createdAt);
            //provides specific time for the data to come like jan, feb
            const monthKey = date.toLocaleString('en-US', { month: 'long' }); 
            //if the month do not exist then create a new one and send it to the user
            if (!expensesByMonth[monthKey]) {
                expensesByMonth[monthKey] = [];
            }

            expensesByMonth[monthKey].push(expense);
        })



        res.json(expensesByMonth)
    }
    catch (error) {
        res.json(error)
    }

})
router.post("/showexpense", validateToken, async (req, res) => {
    //sending the whole table data 
    //in order to send the whole data from the table
    //we can use sequelize findALL


    const id = await req.user.id
    
    const expenseData = await AddExpense.findAll({ where: { UserId: id } });
   

    res.json(expenseData)

})

//For the post,we have to first initialize the path to access the models that we have created
//Destructure the file or table created using const {name} = require("path")
//after that send the body to as name.create(bodyName)
//parsing is required for json file to be formatted using app.use(express.json())
router.post("/", validateToken, async (req, res) => {

    try {

        const id = req.user.id
        const { expenseName, category, price } = req.body;
        const expenseAdd = {
            expenseName: expenseName,
            category: category,
            price: price,
            UserId: id
        }

        await AddExpense.create(expenseAdd)
        res.json(expenseAdd);
    }
    catch (error) {
        
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


