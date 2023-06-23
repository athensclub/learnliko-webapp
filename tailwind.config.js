/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		fontFamily: { 'line-seed': 'LINE Seed Sans TH' },
		extend: {
			transitionProperty: {
				size: 'width, height',
				position: 'left, right, top, bottom',
				font: 'font'
			},
			boxShadow: {
				'all': '0px 1px 8px 0px #00000040'
			},
			keyframes: {
				wiggle: {
				  '0%, 100%': { transform: 'rotate(-3deg)' },
				  '50%': { transform: 'rotate(3deg)' },
				}
			  },
			  animation: {
				wiggle: 'wiggle 1s ease-in-out forwards',
			  }
		}
	},
	plugins: []
};
