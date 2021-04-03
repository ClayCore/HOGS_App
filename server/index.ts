import app from './routing';

const port = process.env.port || 3000;

app.listen(port, () => {
	console.log(`Server is listening at [https://localhost:${port}]`);
});
