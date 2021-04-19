import { $ } from './utils.js';

type ChartRecord = {
	label?: string;
	data?: number;
};

type Player = {
	name: string;
	raw: {
		score: number;
		time: number;
	};
};

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
			options: {
				// global: {
				// 	defaultFont: 'Roboto',
				// },
			},
		};

		return new Chart(canvas, chartConfig);
	}
};

const updateChart = (chart: any, record?: ChartRecord) => {
	if (record?.label) {
		chart.data.labels.push(record?.label);
	}

	if (record?.data) {
		chart.data.datasets.forEach((dataset: any) => {
			dataset.data.push(record?.data);
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
			.then((response) => response.json())
			.then((playerData) => {
				// Update the table div
				const table = $('#playersTable');
				if (table) {
					playerData.forEach((player: Player) => {
						const playerDiv = document.createElement('div');
						playerDiv.classList.add('.playerRow');

						const name = document.createTextNode(player.name);
						const score = document.createTextNode(player.raw.score.toString());
						const timePlayed = document.createTextNode(player.raw.time.toString());

						const nameBlock = document.createElement('p');
						const scoreBlock = document.createElement('p');
						const timeBlock = document.createElement('p');

						nameBlock.appendChild(name);
						scoreBlock.appendChild(score);
						timeBlock.appendChild(timePlayed);

						playerDiv.innerHTML += nameBlock.outerHTML + scoreBlock.outerHTML + timeBlock.outerHTML;
					});
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
