const express = require('express'); //initializing express
//using excpress to map those routes
const router = express.Router()
const {AddExpense} = require("../models")

router.post("/", async(req, res)=> {
    try {
        const deleteExpenseId = req.body;
        await AddExpense.destroy({where: {id :deleteExpenseId.id}});
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