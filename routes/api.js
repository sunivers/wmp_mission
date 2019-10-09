const express = require('express');
const router = express.Router();
const getHtml = require('../logic/getHtml.js');

router.post('/submit', (req, res) => {
  getHtml(req, res);
});

module.exports = router;
