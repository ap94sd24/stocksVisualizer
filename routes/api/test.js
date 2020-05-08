const express = require('express');
const router = express.Router();

// @route GET/PUT/DELETE/POST 
// @desc 
// @access public/private
router.get('/', (req, res) => res.send('TESTING...'));

module.exports = router;