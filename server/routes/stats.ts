import { TF_GAMESERVER } from '../utils/constants';
import express from 'express';
import gamedig from 'gamedig';

const queryPlayers = async () => {
	const playersState = await gamedig.query(TF_GAMESERVER as gamedig.QueryOptions);

	return playersState.players;
};

const processPlayers = async () => {
	const players = await queryPlayers();

	console.log(players);
	players.forEach((player) => {
		console.log(player);
	});

	return players;
};

const stats = express.Router();
stats.get('/', (req, res) => {
	res.render('stats/index.pug', { playerData: null });
});

stats.get('/players-table', (req, res) => {
	const playerData = processPlayers();
	res.render('stats/players-table.pug', { playerData: playerData });
});

export default stats;
