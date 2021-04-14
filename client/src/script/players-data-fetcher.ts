import { $ } from './utils.js';

window.addEventListener('load', () => {
	setTimeout(updatePlayers, 5*1000);
})

function updatePlayers() {
	fetch('/stats/players-table')
		.then(response => response.text())
		.then(HTML => {
			const table =	$('#playersTable');
			if (table)
				table.innerHTML = HTML;
			setTimeout(updatePlayers, 5*1000);
		});

}