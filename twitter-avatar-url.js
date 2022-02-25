require("dotenv").config();

const EleventyFetch = require("@11ty/eleventy-fetch");
const debug = require("debug")("twitter-avatar-url");

function getLargeUrlFromSmallUrl(url) {
  return url.replace("_normal", "_400x400");
}

function chunkUsernames(usernames = [], limit = 100) {
  let chunks = [];
  for(let j = 0, k = usernames.length; j<k; j+= limit) {
    chunks.push(usernames.slice(j, j + limit));
  }
  return chunks;
}

async function getUrls(usernames = [], options = {}) {
  //curl https://api.twitter.com/1.1/users/lookup.json?usernames=TwitterDev,Twitter -H "Authorization: Bearer $BEARER_TOKEN"
  //curl https://api.twitter.com/2/users/by?usernames=TwitterDev,Twitter&user.fields=profile_image_url -H "Authorization: Bearer $BEARER_TOKEN"

  try {
    let url;
    if(Math.floor(options.twitterApiVersion) === 1) {
      let v1Params = new URLSearchParams({
        screen_name: usernames.join(",")
      });
      url = `https://api.twitter.com/1.1/users/lookup.json?${v1Params}`;
    } else {
      let v2Params = new URLSearchParams({
        usernames: usernames.join(","),
        "user.fields": "profile_image_url"
      });
      url = `https://api.twitter.com/2/users/by?${v2Params}`;
    }

		/* This returns a promise */
		let results = await EleventyFetch(url, {
			duration: "1d",
      type: "json",
      fetchOptions: {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
      }
    });

    if(results.errors) {
      console.log(`twitter-avatar-url Twitter API Errors (good entry count: ${results.data.length}):`, results.errors);
    }

    let avatarUrls = [];
    let data;
    if(Array.isArray(results.data)) { // v2 API
      data = results.data;
    } else if(Array.isArray(results)) { // v1 API
      data = results;
    } else {
      data = [];
    }

    for(let entry of data) {
      let entryUrl = entry.profile_image_url || entry.profile_image_url_https;
      avatarUrls.push({
        username: (entry.username || entry.screen_name).toLowerCase(),
        url: {
          small: entryUrl,
          large: getLargeUrlFromSmallUrl(entryUrl)
        }
      });
    }
    return avatarUrls;
	} catch(e) {
    console.log("twitter-avatar-url Error:", e);
		return [];
	}
}

async function fetchAll(usernames = [], options = {}) {
  if(typeof usernames === "string") {
    usernames = [usernames];
  }

  let token = process.env.TWITTER_BEARER_TOKEN;
  if(!token) {
    console.error("Missing TWITTER_BEARER_TOKEN environment variable!");
    return;
  }

  // case insensitive
  let lowercase = usernames.map(entry => entry.toLowerCase());

  // make unique and sort, keep non-empty entries only
  usernames = Array.from(new Set(lowercase.filter(entry => !!entry))).sort();

  let results = await Promise.all(chunkUsernames(usernames).map(chunk => {
    return getUrls(chunk, options);
  }));
  let returnData = [];
  for(let result of results) {
    for(let entry of result) {
      returnData.push(entry);
    }
  }
  return returnData;
}

module.exports = fetchAll;

module.exports.chunkUsernames = chunkUsernames;