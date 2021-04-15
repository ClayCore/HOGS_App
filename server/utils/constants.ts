import User from '@typings/User';

const GROUP_PROFILE_URL = 'https://steamcommunity.com/groups/HightowerOGs';
const WEBAPI_PROFILE_URL = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002';

export const getGroupProfileUrl = (subpage: string) => {
	return `${GROUP_PROFILE_URL}/${subpage}`;
};

export const getWebApiUrl = (query: string) => {
	return `${WEBAPI_PROFILE_URL}/${query}`;
};

export const TF_GAMESERVER = {
	type: 'tf2',
	host: '89.34.96.159',
	port: 27015,
};

export const STAFF_MEMBERS: Array<User> = [
	{ steamid: '76561198066378373', nick: 'Fuel-Black', role: 'Owner' },
	{ steamid: '76561197962534841', nick: 'stfwn', role: 'Administration' },
	{ steamid: '76561198115627631', nick: 'claymore', role: 'Developer' },
	{ steamid: '76561198869806001', nick: 'junior', role: 'Developer' },
	{ steamid: '76561198148565659', nick: 'fl1p', role: 'Moderation' },
	{ steamid: '76561198429396241', nick: 'skar', role: 'Moderation' },
	{ steamid: '76561198316733348', nick: 'rechurd_', role: 'Moderation' },
];
