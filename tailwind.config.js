module.exports = {
	purge: {
		content: [
			"./pages/**/*.{js,ts,jsx,tsx}",
			"./components/**/*.{js,ts,jsx,tsx}",
			"./layouts/**/*.{js,ts,jsx,tsx}"
		],
		options: {
			safelist: [
				"border-primary-yellow",
				"border-primary-teal",
				"border-primary-rose",
				"bg-primary-yellow",
				"bg-primary-teal",
				"bg-primary-rose",
				"hover:bg-primary-yellow",
				"hover:bg-primary-teal",
				"hover:bg-primary-rose",
				"active:bg-primary-yellow",
				"active:bg-primary-teal",
				"active:bg-primary-rose"
			]
		}
	},
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				"primary-default": "#FC76A1",
				"primary-yellow": "#DBBE56",
				"primary-orange": "#E39264",
				"primary-red": "#D25A61",
				"primary-purple": "#AE68E6",
				"primary-blue": "#4BACD5",
				"primary-teal": "#70C4BF",
				"primary-gray": "#7B7B8E",
				"primary-brown": "#9E7F72",
				"primary-darkBrown": "#5B4D47",
				"primary-background": "#15151C",
				"secondary-background": "#191921",
				"primary-card": "#1D1D26",
				"hover-card": "#23232E",
				"secondary-card": "#2A2938"
			},
			borderWidth: {
				1: "1px",
				3: "3px"
			},
			fontSize: {
				xxs: ".625rem"
			}
		}
	},
	variants: {
		extend: {
			textDecoration: ["focus-visible"],
			ringWidth: ["focus-visible"],
			ringColor: ["focus-visible"],
			ringOffsetWidth: ["focus-visible"],
			ringOffsetColor: ["focus-visible"],
			ringOpacity: ["focus-visible"],
			backgroundColor: ["active"]
		}
	},
	plugins: []
};
