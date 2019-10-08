const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/url', (req, res) => {
  const body = req.body;

  const getHtml = async () => {
    try {
      return await axios.get(body.url);
    } catch (error) {
      console.error(error);
    }
  };

  const trim = str => {
    return str
      .replace(/\s/g, '')
      .replace(/\n/g, '')
      .replace(/\r/g, '');
  };
  const removeTag = str => {
    const regExp = /<.+?>/gm;
    return str.replace(regExp, '');
  };
  const getNumberStr = str => {
    const regExp = /[0-9]/gm;
    const newStr = str.match(regExp);
    return newStr ? newStr.join('') : '';
  };
  const getUpperStr = str => {
    const regExp = /[A-Z]/gm;
    const newStr = str.match(regExp);
    return newStr ? newStr.join('') : '';
  };
  const getLowerStr = str => {
    const regExp = /[a-z]/gm;
    const newStr = str.match(regExp);
    return newStr ? newStr.join('') : '';
  };
  const getCrossStr = (str1, str2) => {
    const arr1 = str1.split('');
    const arr2 = str2.split('');
    let newStr = [];

    let shoter = str1.length < str2.length ? str1.length : str2.length;
    let longer = str1.length > str2.length ? arr1 : arr2;

    while (shoter) {
      newStr.push(arr1.shift());
      newStr.push(arr2.shift());
      shoter--;
    }
    newStr = newStr.concat(longer);

    return newStr.join('');
  };

  getHtml()
    .then(({ data }) => {
      const html =
        parseInt(body.type) === 0 ? trim(removeTag(data)) : trim(data);
      const upper = getUpperStr(html)
        .split('')
        .sort()
        .join('');
      const lower = getLowerStr(html)
        .split('')
        .sort()
        .join('');
      const alphabet = upper + lower;
      const number = getNumberStr(html)
        .split('')
        .sort()
        .join('');
      const crossStr = getCrossStr(alphabet, number);
      res.json({
        html,
        crossStr,
        quotient: crossStr.slice(0, body.unit),
        remainder: crossStr.slice(body.unit, crossStr.length),
        req: req.body,
      });
    })
    .catch(error => {
      console.log(error);
      res.json({
        html: '',
        crossStr: '',
        req: req.body,
      });
    });
});

module.exports = router;
