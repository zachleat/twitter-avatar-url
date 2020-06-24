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
	let url = await getTwitterAvatarUrl("zachleat");
	console.log( url );
})();
```