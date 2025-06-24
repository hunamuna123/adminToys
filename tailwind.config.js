/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		`~/components/**/*.{vue,js,ts}`,
		`~/layouts/**/*.vue`,
		`~/pages/**/*.vue`,
		`~/composables/**/*.{js,ts}`,
		`~/plugins/**/*.{js,ts}`,
		`~/utils/**/*.{js,ts}`,
		`~/App.{js,ts,vue}`,
		`~/app.{js,ts,vue}`,
		`~/Error.{js,ts,vue}`,
		`~/error.{js,ts,vue}`,
		`~/app.config.{js,ts}`,
		'./node_modules/preline/preline.js',
	],

	theme: {
		extend: {
			fontFamily: {
				inter: ['"inter"', 'sans-serif'],
			},

			keyframes: {
				shimmer: {
					'100%': {
						transform: 'translateX(100%)',
					},
				},
			},
		},
	},

	plugins: [require('preline/plugin')],
}
