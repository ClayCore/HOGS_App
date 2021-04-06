import axios from 'axios';
import express from 'express';

async function getUserAvatar(steamId: string): Promise<string> {
	const profileId = `https://steamcommunity.com/profiles/${steamId}`;

	const result = await axios.get(profileId).then((res) => {
		// HACK: get DOM from the response
		const doc = document.createElement('div');
		doc.innerHTML = res.data;

		// Grab the avatar img `src` attribute
		const userAvatar = doc.querySelector('.playerAvatar img');
		const userAvatarUrl = userAvatar?.getAttribute('src');

		return userAvatarUrl;
	});

	return result ?? '';
}

// TODO: Refactor to make it nice.
async function getAllAvatars(): Promise<string[]> {
	const sids = [
		'76561198115627631', // Claymore
		'76561198066378373', // Fuel-Black
		'76561198869806001', // junior
		'76561198148565659', // fl1p
		'76561198429396241', // skar
		'76561197962534841', // stfwn
		'76561198316733348', // rechurd
	];

	const avatarUrls: string[] = [];
	sids.forEach(async (steamId: string) => {
		const url = await getUserAvatar(steamId);
		avatarUrls.push(url);
	});

	return avatarUrls;
}

const homepage = express.Router();
homepage.route('/').get((req, res) => {
	res.render('index.pug', { userAvatars: getAllAvatars() });
});

export default homepage;
