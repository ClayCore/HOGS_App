import express from 'express';
import path from 'path';

const port = process.env.port || 3000;

const app = express();
const rootPath = path.join(__dirname, '..', 'public');

app.use(express.static(rootPath));
app.use(express.static('/build/static'));

app.listen(port, () => {
	console.log(`Server is listening at [https://localhost:${port}]`);
});
