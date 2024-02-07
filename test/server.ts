import http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
	//Generate a random delay between 500ms and 2000ms
	const delay = Math.random() * (2000 - 500) + 500;
	//Randomly choose between a 200 and 500 status code
	const statusCode = Math.random() < 0.5 ? 200 : 500;
	setTimeout(() => {
		res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
		res.end(`Response from Server 1 with status code: ${statusCode}\n`);
	}, delay);
});

server.listen(PORT, () => {
	console.log(`Server running at http://localhost:${PORT}/`);
});
