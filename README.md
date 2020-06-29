# twitter-avatar-url

Find a twitter avatar image url from a twitter username.

## Installation

```
npm install twitter-avatar-url
```

## Usage

```js
const getTwitterAvatarUrl = require("twitter-avatar-url");

(async function() {
	let avatarInfo = await getTwitterAvatarUrl("zachleat");
	/*
	// Returns an object like:

	{ username: 'jamstackconf',
		url:{
			small: 'https://pbs.twimg.com/profile_images/1217872345651609603/-Ybv2ifT_normal.jpg',
			large: 'https://pbs.twimg.com/profile_images/1217872345651609603/-Ybv2ifT_400x400.jpg'
		}
	}
	*/

	console.log( avatarInfo.url.large );
})();
```