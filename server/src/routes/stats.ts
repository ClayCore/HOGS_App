import { TF_GAMESERVER } from '../utils/constants';
import express from 'express';
import gamedig from 'gamedig';

const queryPlayers = async () => {
	const playersState = await gamedig.query(TF_GAMESERVER as gamedig.QueryOptions);

	return playersState.players;
};

const stats = express.Router();
stats.route('/stats').get((req, res) => {
	res.render('stats/index.pug');
});

stats.route('/api/stats').get((req, res) => {
	res.render('stats/players-table.pug', { count: 6 });
});

export default stats;
