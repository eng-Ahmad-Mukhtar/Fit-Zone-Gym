const express = require('express');
const router = express.Router();

const sign_control = require('../Controllers/sign_control');

router.get("/LOGIN", sign_control.login_page)









module.exports = router;

