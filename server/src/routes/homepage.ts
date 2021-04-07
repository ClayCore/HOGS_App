import axios from 'axios';
import express from 'express';
import jsdom from 'jsdom';

const getApiKey = () => {
	const steamAPIkey = process.env.STEAM_API_KEY;

	if (steamAPIkey) {
		console.log('Got Web API key.');
	} else {
		console.error('Failed to get Steam API key!');
	}

	return steamAPIkey ? steamAPIkey : undefined;
};

const getUserAvatar = async (steamId: string, apiKey: string | undefined) => {
	if (apiKey) {
		// Use api key to fetch the avatar directly
		const profileUrl = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`;

		return axios
			.get(profileUrl)
			.then((response) => response.data)
			.then((response) => response.avatarfull);
	} else {
		// Fallback to web-scraping from the profile page
		const profileUrl = `https://steamcommunity.com/profiles/${steamId}`;

		return axios
			.get(profileUrl)
			.then((response) => response.data)
			.then((text: string) => {
				// Parse all the incoming HTML
				// and retrieve the userAvatar url
				const parser = new jsdom.JSDOM(text);
				const dom = parser.window.document;
				const userProfilePicture = dom.querySelector('.playerAvatar .playerAvatarAutoSizeInner');

				const userAvatar = userProfilePicture?.getElementsByTagName('img');
				if (userAvatar) {
					// Make sure to not pull the avatar frame out.
					if (userAvatar[1]) {
						return userAvatar[1].src;
					} else {
						return userAvatar[0].src;
					}
				}
			});
	}
};

const homepage = express.Router();
homepage.route('/').get(async (req, res) => {
	const apiKey = getApiKey();

	const sids = [
		{ sid: '76561198066378373', name: 'Fuel-Black', role: 'Owner', avatar_url: '' },
		{ sid: '76561197962534841', name: 'Stfwn', role: 'Administration', avatar_url: '' },
		{ sid: '76561198115627631', name: 'Claymore', role: 'Developer', avatar_url: '' },
		{ sid: '76561198869806001', name: 'Junior', role: 'Developer', avatar_url: '' },
		{ sid: '76561198148565659', name: 'Fl1p', role: 'Moderation', avatar_url: '' },
		{ sid: '76561198429396241', name: 'Skar', role: 'Moderation', avatar_url: '' },
		{ sid: '76561198316733348', name: 'Rechurd', role: 'Moderation', avatar_url: '' },
	];

	const avatarUrls = await Promise.all(
		sids.map((x) => x.sid).map((steamid: string) => getUserAvatar(steamid, apiKey))
	);

	// Add all the values back into the array
	// TODO: Refactor cuz this seems stupid
	for (let i = 0; i < sids.length; ++i) {
		sids[i].avatar_url = avatarUrls[i];
	}

	// NOTE: this renders slowly since the entire routing is paused while the avatar urls are being fetched
	// TODO: preload avatars or add a loader?
	res.render('index.pug', { staffInfo: sids });
});

export default homepage;
