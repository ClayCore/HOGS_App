import axios from 'axios';
import express from 'express';
import jsdom from 'jsdom';

const getUserAvatar = (steamId: string) => {
	const profileId = `https://steamcommunity.com/profiles/${steamId}`;

	return axios
		.get(profileId)
		.then((response) => response.data)
		.then((text: string) => {
			// Parse all the incoming HTML
			// and retrieve the userAvatar url
			const parser = new jsdom.JSDOM(text);
			const userAvatar = parser.window.document.querySelector('.playerAvatar img');

			return userAvatar?.getAttribute('src');
		});
};

const getAllAvatars = async () => {
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
		await getUserAvatar(steamId).then((url) => {
			if (url) {
				console.log(url);
				avatarUrls.push(url);
			}
		});
	});

	return avatarUrls;
};

const homepage = express.Router();
homepage.route('/').get(async (req, res) => {
	res.render('index.pug', { userAvatars: await getAllAvatars() });
});

export default homepage;
