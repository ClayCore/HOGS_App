import * as serviceWorker from './serviceWorker';

import { initFontLibrary } from './utils';

const ENV = process.env.NODE_ENV;
if (ENV) {
	serviceWorker.register();
} else {
	serviceWorker.unregister();
}

(function () {
	require('../styles/master.scss');
	initFontLibrary();
})();
