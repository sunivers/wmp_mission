const axios = require('axios');
const {
  trim,
  removeTag,
  getNumberStr,
  getUpperStr,
  getLowerStr,
  getCrossStr,
} = require('./string.js');

const getHtml = async (req, res) => {
  const body = req.body;

  try {
    const { data } = await axios.get(body.url);

    const html = parseInt(body.type) === 0 ? trim(removeTag(data)) : trim(data);
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
      status: 'suc',
      quotient: crossStr.slice(0, body.unit),
      remainder: crossStr.slice(body.unit, crossStr.length),
      req: req.body,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 'err',
      req: req.body,
    });
  }
};

module.exports = getHtml;
