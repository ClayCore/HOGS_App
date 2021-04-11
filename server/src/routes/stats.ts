import express from 'express';

const stats = express.Router();
stats.route('/stats').get((req, res) => {
	res.render('stats/index.pug');
});

export default stats;
