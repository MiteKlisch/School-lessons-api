const express = require('express');
const School = require('../models/school')
const router = new express.Router();

router.get('/lesson', (req, res) => {
    res.send('testing!');
});

module.exports = router