import express from 'express';

const stats = express.Router();
stats.route('/').get((req, res) => {
	res.render('stats/index.pug');
});

export default stats;
