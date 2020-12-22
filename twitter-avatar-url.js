require("dotenv").config();

const Cache = require("@11ty/eleventy-cache-assets");
const debug = require("debug")("twitter-avatar-url");

function getLargeUrlFromSmallUrl(url) {
  return url.replace("_normal", "_400x400");
}

async function getUrl(usernames = []) {
  if(typeof usernames === "string") {
    usernames = [usernames];
  }
  
  let token = process.env.TWITTER_BEARER_TOKEN;
  if(!token) {
    console.error("Missing TWITTER_BEARER_TOKEN environment variable!");
    return;
  }
  
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
    
    let avatarUrls = [];
    for(let entry of results.data) {
      avatarUrls.push({
        username: entry.username,
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

module.exports = getUrl;
