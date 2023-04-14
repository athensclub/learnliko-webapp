/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: { 'line-seed': 'LINE Seed Sans TH' },
		extend: {
			transitionProperty: {
				size: 'width, height',
				font: 'font'
			},
			boxShadow: {
				'all': '0px 1px 8px 0px #00000040'
			}
		}
	},
	plugins: []
};
