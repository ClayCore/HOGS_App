import { $ } from './utils.js';

// How often to poll the server for player activity?
// NOTE: in ms
const PLAYER_FETCH = 5000;

// Initialize the chart
const initChart = (): any => {
	const canvas = $('canvas#activity') as HTMLCanvasElement;

	if (canvas) {
		// TODO: Dynamic labeling based on current time
		const charLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
		const chartData = {
			labels: charLabels,
			datasets: [
				{
					label: 'Players online',
					backgroundColor: 'rgb(212, 106, 49)',
					borderColor: 'rgb(212, 106, 49)',
					data: [0, 24, 0, 24, 12, 8, 2],
				},
			],
		};
		const chartConfig = {
			type: 'line',
			data: chartData,
			options: {},
		};

		return new Chart(canvas, chartConfig);
	}
};

const updateChart = (chart: any, label?: string, data?: number) => {
	if (label) {
		chart.data.labels.push(label);
	}

	if (data) {
		chart.data.datasets.forEach((dataset: any) => {
			dataset.data.push(data);
		});
	}

	chart.update();
};

(function () {
	const chart = initChart();

	// Fetch player data from the server
	// and update the table and the graph
	const updatePlayers = () => {
		fetch('/stats/players-table')
			.then((response) => response.text())
			.then((HTML) => {
				// Update the table div
				const table = $('#playersTable');
				if (table) {
					table.innerHTML = HTML;
				}

				// TODO: update the chart with data fetched from the server
				updateChart(chart);

				// Restart the interval
				setTimeout(updatePlayers, PLAYER_FETCH);
			});
	};

	// Run on DOM Load
	window.addEventListener('load', () => {
		setTimeout(updatePlayers, PLAYER_FETCH);
	});
})();
