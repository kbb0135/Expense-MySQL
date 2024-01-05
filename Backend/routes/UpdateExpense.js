const express = require('express'); //initializing express
//using excpress to map those routes
const router = express.Router()
const { AddExpense } = require("../models")

//API end point calls
router.get("/", async (req, res) => {
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
router.post("/", async (req, res) => {
    try {
        const updateExpense = req.body;
        const updateData = await AddExpense.findOne({ where: { id: updateExpense.id } });
        updateData.expenseName = updateExpense.expenseName
        updateData.category = updateExpense.category
        updateData.price = updateExpense.price
        await updateData.update(
            {
                expenseName:updateData.expenseName,
                category : updateData.category ,
                price: updateData.price,
             }
            )

        // await updateData.update(expenseAdd); // Updated line
        await updateData.save();
        res.json(updateData);
    }
    catch (error) {
        console.log("Error adding expense:", error);
        res.status(500).json({ error: "Failed to add expense" });
    }
})

//exporting the file to index folder

module.exports = router;

