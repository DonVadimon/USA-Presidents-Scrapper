const rp = require('request-promise');
const $ = require('cheerio');

const Parse = async (url) => {
  try {
    const html = await rp(url);
    return {
      name: $('#firstHeading', html).text(),
      bday: $('.bday', html).text(),
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = Parse;
