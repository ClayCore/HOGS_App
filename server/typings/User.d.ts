import SteamID from 'steamid';

export default interface User {
	steamid: SteamID | string;
	nick: string;
	role?: string; // used for staff members
	avatarUrl?: string;
}
