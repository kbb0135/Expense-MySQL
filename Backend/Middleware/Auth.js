const { verify } = require('jsonwebtoken')
const validateToken = (req, res, next) => {
    //to verify the accessToken, we need to access the
    //token from the client side
    const accessToken = req.header("accessToken")
    //if there is no token provided by the user, send a 403 error message back
    if (!accessToken) {
        return res.json({ error: "Insufficient privileges" })
    }
    else {
        try {
            const validToken = verify(accessToken, "I am logging in")
            if (validToken) {
                return next();
            }
        }
        catch (error) {
            return res.json({error:error})
        }

    }
}
module.exports = {validateToken}