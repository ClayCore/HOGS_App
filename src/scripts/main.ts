(function () {
	// How long should we wait for the DOM to finish loading? (in ms)
	const LOADER_TIMEOUT = 2000;

	const resolveLoader = (): Promise<any> => {
		return new Promise((resolve) => setTimeout(resolve, LOADER_TIMEOUT));
	};

	const loadStyle = (): void => {
		const link = document.createElement('link');
		link.href = 'styles/master.css';
		link.rel = 'stylesheet';

		document.head.appendChild(link);
	};

	const init = (): void => {
		loadStyle();

		// Remove the loader after `LOADER_TIMEOUT` ms.
		window.addEventListener('load', () => {
			resolveLoader().then(() => {
				const loader = document.querySelector('#loader-container');
				if (loader) {
					loader.classList.add('loaded');

					setTimeout(() => {
						loader.outerHTML = '';
					}, LOADER_TIMEOUT);
				}
			});
		});
	};

	init();
})();
