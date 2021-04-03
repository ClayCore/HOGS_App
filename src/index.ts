import express from 'express';

const app = express();

console.log(app.get('env'));

if (process.env.NODE_ENV == 'development') {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	app.use(require('connect-livereload')());
}

app.get('/', (_, res) => res.sendFile('index.html', { root: './build' }));
app.get('/ban_appeal', (_, res) => res.sendFile('ban_appeal.html', { root: './build' }));
app.get('/contact', (_, res) => res.sendFile('contact.html', { root: './build' }));
app.get('/feedback', (_, res) => res.sendFile('feedback.html', { root: './build' }));
app.get('/home', (_, res) => res.sendFile('home.html', { root: './build' }));

app.use(express.static('./build'));

export default app;
