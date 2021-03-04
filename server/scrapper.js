const rp = require('request-promise');
const $ = require('cheerio');
const parse = require('./parser');
// const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States'

const potusScrapper = async (url) => {
  try {
    return rp(url).then((html) => {
      const data = $('tr > td > b > a', html);
      const wikiUrls = [];
      data.each((i, e) => {
        wikiUrls.push(e.attribs.href);
      });
      return Promise.all(
        wikiUrls.map((curUrl) => parse(`https://en.wikipedia.org${curUrl}`)),
      );
    }).finally((presidents) => presidents);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = potusScrapper;
