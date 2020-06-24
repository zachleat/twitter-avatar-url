const getTwitterAvatarUrl = require("./twitter-avatar-url");

(async function() {
	let promises = [];
	promises.push(getTwitterAvatarUrl("zachleat"));
	promises.push(getTwitterAvatarUrl("eleven_ty"));
	promises.push(getTwitterAvatarUrl("nejsconf"));
	promises.push(getTwitterAvatarUrl("nebraskajs"));
	promises.push(getTwitterAvatarUrl("netlify"));
	promises.push(getTwitterAvatarUrl("filamentgroup"));
	promises.push(getTwitterAvatarUrl("zachleat"));
	promises.push(getTwitterAvatarUrl("eleven_ty"));
	promises.push(getTwitterAvatarUrl("nejsconf"));
	promises.push(getTwitterAvatarUrl("nebraskajs"));
	promises.push(getTwitterAvatarUrl("netlify"));
	promises.push(getTwitterAvatarUrl("filamentgroup"));
	
	let results = await Promise.all(promises);
	console.log( results );
})();