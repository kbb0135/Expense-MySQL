const express = require('express'); //initializing express
//using excpress to map those routes
const router = express.Router()
const { Users } = require("../models")

//bcrypt to hash user's password
const bcrypt = require("bcrypt")

//API end point calls

//For the post,we have to first initialize the path to access the models that we have created
//Destructure the file or table created using const {name} = require("path")
//after that send the body to as name.create(bodyName)
//parsing is required for json file to be formatted using app.use(express.json())
router.post("/", async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        //check if user with that name already exists
        const user = await Users.findOne({ where: { email: email } });
        if(user=== null) {
            //Hashing the password before saving it into database
            //hash will provide me the hashed password
            bcrypt.hash(password, 10).then((hash) => {
                Users.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: hash
                })
                res.json("Successfully created Users")
            })
        }
        else {
            if (user.email === email) {
                throw new Error("User already exist")
            }
            else {
                //Hashing the password before saving it into database
                //hash will provide me the hashed password
                bcrypt.hash(password, 10).then((hash) => {
                    Users.create({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: hash
                    })
                    res.json("Successfully created Users")
                })
    
            }
        }
        

    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }

})

// router.post('/login', async(req, res)=> {
//     const {email, password} = req.body;
//     const user = await Users.findOne({ where: {email: email} })
//     if(!user) res.json({error:"User doesn't exists"})


//     bcrypt.compare(password, user.password).then((match)=> {
//         if(!match) res.json({error: "Username or password do not match"})
//         res.json("You are logged in");
//     })

// })
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ where: { email: email } });
        if (!user) throw new Error("User doesn't exists");
        await bcrypt.compare(password, user.password).then((match) => {
            if (!match) throw new Error("Username or password do not match");
            res.json("You are logged in");
        })

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
})

//exporting the file to index folder

module.exports = router;


