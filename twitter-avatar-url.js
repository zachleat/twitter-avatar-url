const cheerio = require("cheerio");
const fetch = require("node-fetch");
const {default: PQueue} = require("p-queue");
const debug = require("debug")("twitter-avatar-url");

async function getUrl(username) {
  // transform the size parameter into the image URL pattern needed in the request
  const option = {
    "small" : "_normal",
    "large" : "_400x400"
  };

  // Make the request to twitter and parse the response
  let body = await fetch(`https://mobile.twitter.com/${username}`);
  let res = await body.text();
  debug("Body text: %o", res);
  let $ = cheerio.load(res);
  let url = $(".avatar img").attr("src") || "";
  debug("Found url: %o", url);

  return {
    username: username,
    url: {
      small: url,
      large: url.replace("_normal", option.large)
    }
  };
}

/* Queue */
let queue = new PQueue({
  concurrency: 5
});

queue.on("active", () => {
  debug( `Concurrency: ${queue.concurrency}, Size: ${queue.size}, Pending: ${queue.pending}` );
});

async function queueGetUrl(username) {
  return queue.add(() => getUrl(username));
}

module.exports = queueGetUrl;

Object.defineProperty(module.exports, "concurrency", {
  get: function() {
    return queue.concurrency;
  },
  set: function(concurrency) {
    queue.concurrency = concurrency;
  },
});