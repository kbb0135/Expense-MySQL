const express = require('express'); //initializing express
//using excpress to map those routes
const router = express.Router()
const { AddSaving } = require("../models");
const { validateToken } = require('../Middleware/Auth');

//API end point calls
router.post("/showsaving", validateToken, async (req, res) => {
    //sending the whole table data 
    //in order to send the whole data from the table
    //we can use sequelize findALL


    const id = await req.user.id
    console.log(id)
    const savingData = await AddSaving.findAll({where:{UserId:id}});
    console.log("saving=",savingData)
    
    res.json(savingData)
   
})

//For the post,we have to first initialize the path to access the models that we have created
//Destructure the file or table created using const {name} = require("path")
//after that send the body to as name.create(bodyName)
//parsing is required for json file to be formatted using app.use(express.json())
router.post("/", validateToken, async (req, res) => {

    try {
        const { saving } = req.body;
        const id = await req.user.id
        console.log(id)
        const data = {
            saving: saving,
            UserId: id
        }
        await AddSaving.create(data);
        res.json(data);
    }
    catch {
        console.log("Error adding expense:", error);
        res.status(500).json({ error: "Failed to add expense" });
    }

})

//exporting the file to index folder

module.exports = router;


