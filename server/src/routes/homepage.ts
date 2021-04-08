import { STAFF_MEMBERS } from '../utils/constants';
import express from 'express';
import processMembers from '../utils';

const homepage = express.Router();
homepage.route('/').get(async (req, res) => {
	// NOTE: this renders slowly since the entire routing is paused while the avatar urls are being fetched
	// TODO: preload avatars or add a loader?
	res.render('index.pug', { staffInfo: await processMembers(STAFF_MEMBERS) });
});

export default homepage;
