const AysncHandler = require("express-async-handler")

const Home_page = AysncHandler(async (req, res) => {

    res.status(200).render("home")

})

module.exports = {
    Home_page
}


