import { GROUP_PROFILE_URL } from './constants';
import SteamID from 'steamid';
import User from '@typings/User';
import axios from 'axios';
import cheerio from 'cheerio';

export const getApiKey = () => {
	const apiKey = process.env.WEBAPI_KEY;

	if (apiKey) {
		console.log('Got WebAPI key.');
	} else {
		console.error('Failed to get WebAPI key.');
	}

	return apiKey ?? undefined;
};

const queryMembers = async (apiKey?: string) => {
	const url = GROUP_PROFILE_URL + '/members';

	if (apiKey) {
		// TODO: fetch user information using provided webapi key
		return axios.get(url).then((response) => response.data);
	} else {
		return axios.get(url).then((response) => response.data);
	}
};

const scrapeMembers = (rawResponse: string) => {
	const $ = cheerio.load(rawResponse);
	const members = $('.member_block')
		.get()
		.map((member) => {
			// scrap all the necessary information
			const nick = $('.linkFriend', member).text();
			const sidRaw = $('.linkFriend', member).attr('href');
			const avatarUrl = $('.playerAvatar img', member).attr('src');

			console.log(`Fetched:\n\tNick: [${nick}]\t SteamID: [${sidRaw}]\t AvatarUrl: ${avatarUrl}`);

			// Convert steamid
			if (sidRaw) {
				const sid = sidRaw.split('/')?.pop() || '';
				const isNumerical = sid.match(/^[0-9]+$/) != null;

				if (nick && avatarUrl) {
					if (sid !== '' || !isNumerical) {
						console.error('Vanity steamID present. Do not process');

						return { nick: nick, steamid: sid, avatarUrl: avatarUrl } as User;
					} else {
						const processedSid = new SteamID(sid).getSteam3RenderedID();

						console.log(`Processed SteamID: ${processedSid}`);

						return { nick: nick, steamid: processedSid, avatarUrl: avatarUrl } as User;
					}
				}
			}
		});

	return members;
};

export default async function processMembers(memberList?: Array<User>) {
	const apiKey = getApiKey();

	let members = await queryMembers(apiKey).then((members) => scrapeMembers(members));

	if (memberList) {
		// Filter only members defined in the list
		members = members.filter((member) => {
			memberList.filter((staff) => {
				staff.steamid === member?.steamid;
			});
		});

		// Add all the necessary avatar urls
		members.map((member) => {
			memberList.map((staff) => {
				if (member) {
					member.avatarUrl = staff.avatarUrl;
				}
			});
		});
	}

	return members;
}
