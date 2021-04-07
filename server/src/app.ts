import * as routes from './routes/';

import express from 'express';
import livereload from 'connect-livereload';

const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.port || 3000;

const app = express();

console.log('NODE_ENV: ' + NODE_ENV);

if (NODE_ENV == 'development') {
	app.use(livereload());
	console.log('Livereload middleware initialized.');
} else {
	console.log('Assuming production environment.');
}

// Set config vars
app.set('port', PORT);
app.set('mod', NODE_ENV);

// Use the client dir for rendering pug
app.set('views', 'client/template/');

// All routes go here
app.get('/', routes.homepage);

// If unspecified, serve static files
app.use(express.static('client/build'));
app.use(express.static('assets'));

export default app;
