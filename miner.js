const axios = require("axios");
const cheerio = require("cheerio");

async function miner(url) {
  let img = [];
  try {
    const response = await axios.get(url);
    let $ = cheerio.load(response.data);
    $("img").each((index, element) => {
      let src = $(element).attr("src");
      if (src) {
        img.push(src);
      }
    });
  } catch (err) {
    console.log(err);
  }
  return img;
}
module.exports = miner;
