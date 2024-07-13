const AysncHandler = require("express-async-handler")

const login_page = AysncHandler(async (req, res) => {

    res.status(200).render("login")

})

module.exports = {
    login_page
}


