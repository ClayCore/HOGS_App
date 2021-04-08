import User from '@typings/User';

export const GROUP_PROFILE_URL = 'https://steamcommunity.com/groups/HightowerOGs';
export const WEBAPI_PROFILE_URL = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002';

export const TF_GAMESERVER = {
	type: 'tf2',
	host: '89.34.96.159',
	port: 27015,
};

export const STAFF_MEMBERS: Array<User> = [
	{ sidStr: '[U:1:106112645]', nick: 'Fuel-Black', role: 'Owner' },
	{ sidStr: '[U:1:2269113]', nick: 'Stfwn', role: 'Administration' },
	{ sidStr: '[U:1:155361903]', nick: 'Claymore', role: 'Developer' },
	{ sidStr: '[U:1:909540273]', nick: 'Junior', role: 'Developer' },
	{ sidStr: '[U:1:188299931]', nick: 'Fl1p', role: 'Moderation' },
	{ sidStr: '[U:1:469130513]', nick: 'Skar', role: 'Moderation' },
	{ sidStr: '[U:1:356467620]', nick: 'Rechurd', role: 'Moderation' },
];
