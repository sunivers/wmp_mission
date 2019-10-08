const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', res => {
  res.render('index.html');
});

router.post('/api/url', (req, res) => {
  console.log(req.body);

  const getHtml = async () => {
    try {
      return await axios.get('http://localhost:3000/');
    } catch (error) {
      console.error(error);
    }
  };

  getHtml().then(html => {
    res.json({
      html: html.data,
      req: req.body,
      userId: 'soyoung',
    });
  });
});

module.exports = router;
