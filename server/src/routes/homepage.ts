import axios from 'axios';
import express from 'express';

function getUserAvatar(steamId: string) {
	const profileId = `https://steamcommunity.com/profiles/${steamId}`;

	return axios
		.get(profileId)
		.then((response) => response.data)
		.then((text) => {
			// Parse all the incoming HTML
			// amnd retrieve the userAvatar url
			const parser = new DOMParser();
			const document = parser.parseFromString(text, 'text/html');
			const userAvatar = document.querySelector('.playerAvatar img');

			return userAvatar?.getAttribute('src');
		});
}

async function getAllAvatars() {
	const sids = [
		'76561198115627631', // Claymore
		'76561198066378373', // Fuel-Black
		'76561198869806001', // junior
		'76561198148565659', // fl1p
		'76561198429396241', // skar
		'76561197962534841', // stfwn
		'76561198316733348', // rechurd
	];

	// TODO: Refactor to make it nice.
	const avatarUrls: string[] = [];
	sids.forEach(async (steamId: string) => {
		const url = await getUserAvatar(steamId);
		console.log(url);

		if (url) {
			avatarUrls.push(url);
		}
	});

	return avatarUrls;
}

const homepage = express.Router();
homepage.route('/').get((req, res) => {
	res.render('index.pug', { userAvatars: getAllAvatars() });
});

export default homepage;
