import { STAFF_MEMBERS } from '../utils/constants';
import express from 'express';
import fetchStaff from '../utils';

const homepage = express.Router();
homepage.route('/').get(async (req, res) => {
	// NOTE: this renders slowly since the entire routing is paused while the avatar urls are being fetched
	// TODO: preload avatars or add a loader?
	const staffInfo =await fetchStaff(STAFF_MEMBERS);
	res.render('index.pug', { staffInfo: staffInfo});
});

export default homepage;
