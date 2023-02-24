const express = require('express');
const router = express.Router();
const {travelList}= require('../controllers/travel');

/* GET home page. */
router.get('/', travelList);

module.exports = router;