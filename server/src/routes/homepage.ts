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
		const groupProfile = 'https://steamcommunity.com/groups/HightowerOGs/members';

		return axios
			.get(groupProfile)
			.then((response) => response.data)
			.then((text: string) => {
				// Parse all the incoming HTML
				// and retrieve the userAvatar url
				const parser = new jsdom.JSDOM(text);
				const dom = parser.window.document;
				const userProfilePicture = dom.querySelector(
					`.member_block[data-miniprofile='${steamId}'] .playerAvatar`
				);

				const userAvatar = userProfilePicture?.getElementsByTagName('img');
				if (userAvatar) {
					// Strip the jpg extensions to add `_full` and the extension back in
					// This is to get the full image from the thumbnail
					const baseUrl = userAvatar[0].src;
					const separator = baseUrl.lastIndexOf('.');
					const fullUrl = baseUrl.substring(0, separator) + '_full.jpg';

					return fullUrl;
				}
			});
	}
};

const getAllInfo = async (apiKey: string | undefined) => {
	const sids = [
		{ sid: '106112645', name: 'Fuel-Black', role: 'Owner', avatar_url: '' },
		{ sid: '2269113', name: 'Stfwn', role: 'Administration', avatar_url: '' },
		{ sid: '155361903', name: 'Claymore', role: 'Developer', avatar_url: '' },
		{ sid: '909540273', name: 'Junior', role: 'Developer', avatar_url: '' },
		{ sid: '188299931', name: 'Fl1p', role: 'Moderation', avatar_url: '' },
		{ sid: '469130513', name: 'Skar', role: 'Moderation', avatar_url: '' },
		{ sid: '356467620', name: 'Rechurd', role: 'Moderation', avatar_url: '' },
	];

	const avatarUrls = await Promise.all(
		sids.map((x) => x.sid).map((steamid: string) => getUserAvatar(steamid, apiKey))
	);

	// Add all the values back into the array
	// TODO: Refactor cuz this seems stupid
	for (let i = 0; i < sids.length; ++i) {
		sids[i].avatar_url = avatarUrls[i];
	}

	return sids;
};

const homepage = express.Router();
homepage.route('/').get(async (req, res) => {
	const apiKey = getApiKey();

	// NOTE: this renders slowly since the entire routing is paused while the avatar urls are being fetched
	// TODO: preload avatars or add a loader?
	res.render('index.pug', { staffInfo: await getAllInfo(apiKey) });
});

export default homepage;
