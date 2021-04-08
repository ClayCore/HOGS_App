import SteamID from 'steamid';

export default interface User {
	nick: string;
	steamid?: SteamID;
	sidStr?: string;
	role?: string; // used for staff members
	avatarUrl?: string;
}
