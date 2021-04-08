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

			// Convert steamid
			if (sidRaw) {
				const sid = sidRaw.split('/')?.pop() || '';

				if (nick && avatarUrl) {
					// Make sure the sid is neither empty nor numerical.
					// If thats the case we know we pulled out a custom/vanity id
					// and the library will not allow us to process it as SteamID3
					if (sid !== '' && !sid.match(/^[0-9]+$/)) {
						return { nick: nick, steamid: sid, avatarUrl: avatarUrl } as User;
					} else {
						const processedSid = new SteamID(sid).getSteam3RenderedID();

						return { nick: nick, steamid: processedSid, avatarUrl: avatarUrl } as User;
					}
				}
			}
		});

	return members;
};

export default async function processMembers(memberList?: Array<User>) {
	const apiKey = getApiKey();

	const members = await queryMembers(apiKey)
		.then((members) => scrapeMembers(members))
		.then((members) => {
			let processedList = members;
			if (memberList) {
				processedList = members.filter((member) => {
					memberList.filter((staff) => {
						staff.steamid === member?.steamid;
					});
				});

				processedList.map((member) => {
					memberList.map((staff) => {
						if (member) {
							member.avatarUrl = staff.avatarUrl;
						}
					});
				});
			}

			console.log(processedList);
			return processedList;
		});

	return members;
}
