# twitter-avatar-url

Find one or more twitter avatar image URLs from one or more twitter usernames.

## Installation

```
npm install twitter-avatar-url
```

Uses [Twitter API v2 `/users/lookup/by`](https://developer.twitter.com/en/docs/twitter-api/users/lookup/api-reference/get-users-by) which requires a `.env` file with a `TWITTER_BEARER_TOKEN` set. You can generate one of these from the [Twitter Developer portal](https://developer.twitter.com/) by creating an application.

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