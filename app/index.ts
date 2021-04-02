import express from 'express';

export default function hook(app: express.Express) {
	app.get('/', (_, res) => res.sendFile('home.html', { root: './build/www' }));
	app.get('/ban_appeal', (_, res) => res.sendFile('ban_appeal.html', { root: './build/www' }));
	app.get('/contact', (_, res) => res.sendFile('contact.html', { root: './build/www' }));
	app.get('/feedback', (_, res) => res.sendFile('feedback.html', { root: './build/www' }));
	app.get('/home', (_, res) => res.sendFile('home.html', { root: './build/www' }));

	app.use(express.static('./build/www'));
}
