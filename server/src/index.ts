import app from './app';

app.listen(app.get('port'), () => {
	console.log(`Server is listening at [http://localhost:${app.get('port')}] in mod (${app.get('mod')})`);
});
