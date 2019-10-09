module.exports = {
  trim: str => {
    return str
      ? str
          .replace(/\s/g, '')
          .replace(/\n/g, '')
          .replace(/\r/g, '')
      : '';
  },

  removeTag: str => {
    const regExp = /<.+?>/gm;
    return str ? str.replace(regExp, '') : '';
  },

  getNumberStr: str => {
    const regExp = /[0-9]/gm;
    const newStr = str.match(regExp);
    return newStr ? newStr.join('') : '';
  },

  getUpperStr: str => {
    const regExp = /[A-Z]/gm;
    const newStr = str.match(regExp);
    return newStr ? newStr.join('') : '';
  },

  getLowerStr: str => {
    const regExp = /[a-z]/gm;
    const newStr = str.match(regExp);
    return newStr ? newStr.join('') : '';
  },

  getCrossStr: (str1, str2) => {
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

    return newStr ? newStr.join('') : '';
  },
};
