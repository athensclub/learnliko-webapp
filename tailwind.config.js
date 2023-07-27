/** @type {import('tailwindcss').Config} */
export default {
	important: true,
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
				all: '0px 1px 8px 0px #00000040'
			},
			keyframes: {
				wiggle: {
					'0%, 100%': { transform: 'rotate(0deg)' },
					'50%': { transform: 'rotate(15deg)' }
				},
				slideInLeft: {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				}
			},
			animation: {
				wiggle: 'wiggle 1s ease-in-out forwards',
				slideInLeft: 'slideInLeft 1s ease-in-out forwards'
			}
		}
	},
	plugins: []
};
