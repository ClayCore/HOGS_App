import express from 'express';

const port = process.env.port || 3000;

const app = express();

app.use(express.static(__dirname + 'public/'));
app.use(express.static('build/static'));

app.listen(port, () => {
	console.log(`Server is listening at [https://localhost:${port}]`);
});
