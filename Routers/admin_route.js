const express = require('express');
const router = express.Router();

const admin_control = require('../Controllers/admin_control');

router.get("/admin", admin_control.admin_page)
router.post("/new_subiscription", admin_control.adding_new_subiscription)
router.get("/subiscription_information", admin_control.one_subiscription_information)
router.get('/autocomplete/', admin_control.name_search)
router.post('/search_subiscription', admin_control.search_subiscription)
router.get('/all_subiscripers', admin_control.all_subiscription)
router.post('/search_subiscriper', admin_control.all_subiscription_by_history)










module.exports = router;

