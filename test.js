const getTwitterAvatarUrl = require("./twitter-avatar-url");

(async function() {
	let url = await getTwitterAvatarUrl("zachleat");
	console.log( url );
})();