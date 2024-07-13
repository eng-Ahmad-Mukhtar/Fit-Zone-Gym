const express = require('express');
const router = express.Router();

const home_control = require('../Controllers/home_control');

router.get("/Home", home_control.Home_page)









module.exports = router;

