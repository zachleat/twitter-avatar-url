# twitter-avatar-url

Find one or more twitter avatar image URLs from one or more twitter usernames. 

* Automatically removes duplicate usernames from the input
* Handles Twitter API limits for you. This service limits 100 usernames per request but if you pass 200 unique usernames to this function, we will return 200 entries to you.
* This API is rate limited to 300 requests in a 15 minute window. Each 100-max limited call counts as one request.

## Installation

```
npm install twitter-avatar-url
```

Can use either the v1 or v2 Twitter API. Both require an `.env` file with a `TWITTER_BEARER_TOKEN` set. You can generate one of these from the [Twitter Developer portal](https://developer.twitter.com/) by creating an application.

* [Twitter API v2 `/users/lookup/by`](https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by) (default)
* [Twitter API v1 `/users/lookup`](https://developer.twitter.com/en/docs/twitter-api/v1/accounts-and-users/follow-search-get-users/api-reference/get-users-lookup)

## Usage

```js
const getTwitterAvatarUrl = require("twitter-avatar-url");

(async function() {
	let avatars = await getTwitterAvatarUrl("zachleat"); // accepts string or array of strings
	/*
	// Returns an object like:

	[
		{ username: 'jamstackconf',
			url:{
				small: 'https://pbs.twimg.com/profile_images/1217872345651609603/-Ybv2ifT_normal.jpg',
				large: 'https://pbs.twimg.com/profile_images/1217872345651609603/-Ybv2ifT_400x400.jpg'
			}
		}
	]
	*/

	console.log( avatars[0].url.large );
})();
```

### Use the Twitter v1 API

```js
const getTwitterAvatarUrl = require("twitter-avatar-url");

let avatars = await getTwitterAvatarUrl("zachleat", {
	twitterApiVersion: 1
});

// Returns the same object as the v2 API above.
```