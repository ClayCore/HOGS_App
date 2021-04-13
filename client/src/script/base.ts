import { $ } from './utils.js';

(function () {
	// Make sure the DOM is loaded
	window.addEventListener('load', async () => {
		const playersTable = $('#playersTable');

		if (playersTable) {
			const response = await fetch('/api/stats');
			playersTable.innerHTML = await response.text();
		}
	});
})();
