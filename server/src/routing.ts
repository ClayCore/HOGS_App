import express from 'express';
import livereload from 'connect-livereload';

const app = express();

const NODE_ENV = process.env.NODE_ENV;

console.log('NODE_ENV: ' + NODE_ENV);

if (NODE_ENV == 'development') {
	app.use(livereload());
	console.log('Livereload middleware initialized.');
} else {
	console.log('Assuming production environment.');
}

// Just for testing
app.set('views', 'client/src/');
app.get('/', (req, res) => {
	res.render('index.pug', { userAvatar: 'lolTest123' });
});

app.use(express.static('client/build'));
app.use(express.static('assets'));

// TODO: rewrite each of the routes as separate files and
// add them all here at the end

export default app;
