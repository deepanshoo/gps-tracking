const express = require('express');
const { getAllUsers } = require('../controllers/adminController');
const router = express.Router();

//Admin gets the users as well as other admins
router.get('/users', getAllUsers);

module.exports = router;