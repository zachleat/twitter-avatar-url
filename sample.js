const getTwitterAvatarUrl = require("./twitter-avatar-url");

(async function() {	
	let results = await getTwitterAvatarUrl([
		"zachleat",
		"eleven_ty",
		"nejsconf",
		"nebraskajs",
		"netlify",
		"filamentgroup",
		"zachleat",
		"eleven_ty",
		"nejsconf",
		"nebraskajs",
		"netlify",
		"filamentgroup"
	]);
	console.log( results );
	console.log( results.length );
})();