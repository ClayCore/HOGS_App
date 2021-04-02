import express from 'express';
import hook from './index';

const app = express();
const port = process.env.port || 3000;

hook(app);

app.listen(port, () => {
	console.log(`Server is listening at [https://localhost:${port}]`);
});
