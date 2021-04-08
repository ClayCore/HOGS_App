export default interface User {
	nick: string;
	steamid: string;
	role?: string; // used for staff members
	avatarUrl?: string;
}
