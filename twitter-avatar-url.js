require("dotenv").config();

const Cache = require("@11ty/eleventy-cache-assets");
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

async function getUrls(usernames = []) {
  //curl https://api.twitter.com/2/users/by?usernames=TwitterDev,Twitter&user.fields=profile_image_url -H "Authorization: Bearer $BEARER_TOKEN"

  try {
    let params = new URLSearchParams({
      usernames: usernames.join(","),
      "user.fields": "profile_image_url"
    });
    let url = `https://api.twitter.com/2/users/by?${params}`;

		/* This returns a promise */
		let results = await Cache(url, {
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
    for(let entry of results.data) {
      avatarUrls.push({
        username: entry.username.toLowerCase(),
        url: {
          small: entry.profile_image_url,
          large: getLargeUrlFromSmallUrl(entry.profile_image_url)
        }
      });
    }
    return avatarUrls;
	} catch(e) {
    console.log("twitter-avatar-url Error:", e);
		return [];
	}
}

async function fetchAll(usernames = []) {
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
    return getUrls(chunk);
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