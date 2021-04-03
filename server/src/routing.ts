import express from 'express';
import livereload from 'connect-livereload';

const app = express();

const NODE_ENV = process.env.NODE_ENV;

console.log('NODE_ENV: ' + NODE_ENV);

if (NODE_ENV == 'development') {
	app.use(livereload());
	console.log('Livereload middleware initialized.');
} else {
	console.log('Assuming production environment.')
}

app.use(express.static('client/build'));
app.use(express.static('assets'));

export default app;
