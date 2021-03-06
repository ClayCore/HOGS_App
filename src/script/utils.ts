// Getting an element or a list of elements
export const $ = (what: string): HTMLElement | null => {
	return document.querySelector(what);
};

export const _ = (what: string): NodeListOf<Element> => {
	return document.querySelectorAll(what);
};

// Randomized strings and numbers
export const getRandomInt = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getUid = (length: number): string => {
	let uid = '';

	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < length; ++i) {
		uid += chars[getRandomInt(0, chars.length - 1)];
	}

	return uid;
};
