(function () {
	const loadStyle = () => {
		const link = document.createElement('link');
		link.href = 'styles/master.css';
		link.rel = 'stylesheet';

		document.head.appendChild(link);
	};

	loadStyle();
})();
