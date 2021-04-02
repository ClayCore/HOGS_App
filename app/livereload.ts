import connectLivereload from 'connect-livereload';
import express from 'express';
import hook from './index';
import livereload from 'livereload';

const app = express();
const port = 8080;
const server = livereload.createServer();

server.watch('./build');

server.server.once('connection', () => {
	setTimeout(() => {
		server.refresh('/');
	}, 100);
});

app.use(connectLivereload());

hook(app);

app.listen(port, () => {
	console.log(`Running livereload: [http://localhost:${port}]`);
});
