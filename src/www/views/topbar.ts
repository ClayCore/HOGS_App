import { $ } from '#package/client/www/scripts/utils';
import { Link } from '#package/client/www/scripts/types';

const links: Array<Link> = [
	{ label: 'Home', target: '/home' },
	{ label: 'Ban Appeal', target: '/ban_appeal' },
	{ label: 'Feedback', target: '/feedback' },
	{ label: 'Contact', target: '/contact' },
];

const links_dom = $('.links');

links.forEach((element) => {
	// Create the 'a' element and set its target.
	const link = document.createElement('a');
	link.href = element.target;

	// Create respective label elements and text nodes
	const label_node = document.createTextNode(element.label ? element.label : '');
	const label_span = document.createElement('span');

	// Append all children
	label_span.appendChild(label_node);
	link.appendChild(label_span);

	// Append the resulting hierarchy of <a><span></span></a> to the .links container
	links_dom?.appendChild(link);
});
