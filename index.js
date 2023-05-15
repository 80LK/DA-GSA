const https = require('https');
const prompt = require('prompt-sync')({ sigint: true });

const token = prompt('Your DA token: ', { echo: "*" });
let socketUrl = null;

https.get('https://www.donationalerts.com/widget/alerts?group_id=1&token=' + token, (res) => {
	if (res.statusCode !== 200)
		return console.error("Error: Code response " + res.statusCode);

	res.on('data', (d) => {
		let data = d.toString().match(/(wss:\/\/(?:.*).donationalerts.ru(?::\d+)?)/);
		if (data) socketUrl = data[1];
	});
}).on('error', (e) => {
	console.error(e);
}).on("close", () => {
	if (socketUrl)
		console.log("Socket address:", socketUrl)
	else
		console.error("Unknown error");

	prompt("Push Enter to exit...", { echo: '' });
})
