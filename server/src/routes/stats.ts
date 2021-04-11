import express from 'express';
import homepage from './homepage';

const stats = express.Router();
homepage.route('/').get((req, res) => {
	res.render('stats/index.pug');
});

export default stats;
