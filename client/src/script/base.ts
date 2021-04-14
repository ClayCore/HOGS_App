import { $ } from './utils.js';

(function () {
	// Make sure the DOM is loaded
	window.addEventListener('load', async () => {
		// TODO: Check for the subpage containing `/stats`
		// This eliminates the need for paranoically checking
		// every subgpage and root homepage for the necessary div to render
		// the data fetched from the server into
		const playersTable = $('#playersTable');

		if (playersTable) {
			const response = await fetch('/api/stats');

			console.log(response);

			playersTable.innerHTML = await response.text();
		}
	});
})();
