import User from '@typings/User';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';

async function fetchProfileInfo(steamID64: string) {
	const url = `https://steamcommunity.com/profiles/${steamID64}?xml=1`;
	const response = await axios.get(url);
	const data = await parseStringPromise(response.data);
	return {
		name: data.profile.steamID,
		avatar: data.profile.avatarFull[0],
	};
}

async function fetchStaff(staff: Array<User>) {
	const promises = staff.map((member) => fetchProfileInfo(member.steamid));
	const profiles = await Promise.all(promises);
	return staff.map((member, i) => ({
		avatarUrl: profiles[i].avatar,
		nick: member.nick,
		role: member.role,
	}));
}

export default fetchStaff;
