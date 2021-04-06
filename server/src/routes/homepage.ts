import axios from 'axios';
import express from 'express';
import jsdom from 'jsdom';

const getUserAvatar = async (steamId: string) => {
	const steamAPIkey = process.env.STEAM_API_KEY;

	if (!steamAPIkey) {
		console.error('Failed to get Steam API key!');
		console.log('Falling back to web-scraping.');

		const profileUrl = `https://steamcommunity.com/profiles/${steamId}`;

		return axios
			.get(profileUrl)
			.then((response) => response.data)
			.then((text: string) => {
				// Parse all the incoming HTML
				// and retrieve the userAvatar url
				const parser = new jsdom.JSDOM(text);
				const userAvatar = parser.window.document.querySelector(
					".playerAvatar .playerAvatarAutoSizeInner img:not('.profile_avatar_frame')"
				);

				return userAvatar?.getAttribute('src');
			});
	} else {
		console.log('Got Web API key.');

		const profileUrl = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${steamAPIkey}&steamids=${steamId}`;

		return axios
			.get(profileUrl)
			.then((response) => response.data)
			.then((response) => response.avatarfull);
	}
};

const homepage = express.Router();
homepage.route('/').get(async (req, res) => {
	const sids = [
		{ sid: '76561198066378373', name: 'Fuel-Black', role: 'Owner' },
		{ sid: '76561197962534841', name: 'Stfwn', role: 'Administration' },
		{ sid: '76561198115627631', name: 'Claymore', role: 'Developer' },
		{ sid: '76561198869806001', name: 'Junior', role: 'Developer' },
		{ sid: '76561198148565659', name: 'Fl1p', role: 'Moderation' },
		{ sid: '76561198429396241', name: 'Skar', role: 'Moderation' },
		{ sid: '76561198316733348', name: 'Rechurd', role: 'Developer' },
	];

	// Destructure and pull out the useful stuff out.
	const roles = sids.map((x) => x.role);
	const names = sids.map((x) => x.name);
	const avatarUrls = await Promise.all(sids.map((x) => x.sid).map((steamid: string) => getUserAvatar(steamid)));

	// NOTE: this renders slowly since the entire routing is paused while the avatar urls are being fetched
	// TODO: preload avatars or add a loader?
	res.render('index.pug', { staffAvatars: avatarUrls, staffNames: names, staffRoles: roles });
});

export default homepage;
