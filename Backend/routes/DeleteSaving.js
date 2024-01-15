const express = require('express'); //initializing express
//using excpress to map those routes
const router = express.Router()
const {AddSaving} = require("../models")
const { validateToken } = require("../Middleware/Auth")
router.get("/", (req, res)=> {
    res.send("HelloWorld")
})
router.post("/",validateToken, async(req, res)=> {
    try {
        const deleteSavingId = req.body;
        await AddSaving.destroy({where: {id :deleteSavingId.id}});
    }
    catch(error) {
        
        res.status(500).json({ error: "Failed to delete Saving" });
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
