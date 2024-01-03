const express = require('express'); //initializing express
//using excpress to map those routes
const router = express.Router()
const {AddSaving} = require("../models")

//API end point calls
router.get("/", async(req, res)=> {
    const sendData = await AddSaving.findAll();
    res.json(sendData);
})

//For the post,we have to first initialize the path to access the models that we have created
//Destructure the file or table created using const {name} = require("path")
//after that send the body to as name.create(bodyName)
//parsing is required for json file to be formatted using app.use(express.json())
router.post("/", async(req, res)=> {
    const sendData =req.body;
    await AddSaving.create(sendData);
    res.json(sendData);
})

//exporting the file to index folder

module.exports = router;


