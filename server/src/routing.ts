import express from 'express';
import homepage from './routes/homepage';
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

// Use the client dir for rendering pug
app.set('views', 'client/template/');

// All routes go here
app.get('/', homepage);

// If unspecified, serve static files
app.use(express.static('client/build'));
app.use(express.static('assets'));

export default app;
