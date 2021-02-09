module.exports = {
	purge: {
		content: [
			"./pages/**/*.{js,ts,jsx,tsx}",
			"./components/**/*.{js,ts,jsx,tsx}"
		],
		options: {
			safelist: [
				"border-primary-yellow",
				"border-primary-teal",
				"border-primary-rose",
				"bg-primary-yellow",
				"bg-primary-teal",
				"bg-primary-rose",
				"bg-opacity-40"
			]
		}
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				"primary-default": "#7578D1",
				"primary-pink": "#C97DD6",
				"primary-rose": "#D05673",
				"primary-teal": "#4BAE96",
				"primary-yellow": "#DDB058",
				"primary-background": "#191B21",
				"secondary-background": "#1E2027",
				"primary-card": "#21232D",
				"hover-card": "#333644",
				"secondary-card": "#2A2D39"
			},
			borderWidth: {
				3: "3px"
			}
		}
	},
	variants: {
		extend: {
			backgroundColor: ["active"]
		}
	},
	plugins: []
};
