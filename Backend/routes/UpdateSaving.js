const express = require('express'); //initializing express
//using excpress to map those routes
const router = express.Router()
const {AddSaving} = require("../models")

//API end point calls


//For the post,we have to first initialize the path to access the models that we have created
//Destructure the file or table created using const {name} = require("path")
//after that send the body to as name.create(bodyName)
//parsing is required for json file to be formatted using app.use(express.json())
router.post("/", async(req, res)=> {
    try {
        const updateSaving = req.body;
        const updateData = await AddSaving.findOne({ where: { id: updateSaving.id } });
        await updateData.update(
            {
               saving:updateSaving.saving
             }
            )
       

        // await updateData.update(expenseAdd); // Updated line
        await updateData.save();
        res.json(updateData);
    }
    catch (error) {
     
        res.status(500).json({ error: "Failed to add expense" });
    }
})

//exporting the file to index folder

module.exports = router;