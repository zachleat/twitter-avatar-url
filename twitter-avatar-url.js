const cheerio = require("cheerio");
const fetch = require("node-fetch");

async function getUrl(username) {
  // transform the size parameter into the image URL pattern needed in the request
  const option = {
    "small" : "_normal",
    "large" : "_400x400"
  };

  // Make the request to twitter and parse the response
  let body = await fetch(`https://mobile.twitter.com/${username}`);
  let res = await body.text();
  let $ = cheerio.load(res);
  let url = $(".avatar img").attr("src") || "";

  return {
    username: username,
    url: {
      small: url,
      large: url.replace("_normal", option.large)
    }
  };
}

module.exports = getUrl;