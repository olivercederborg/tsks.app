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
				"primary-background": "#181820",
				"secondary-background": "#1E1E29",
				"hero-background": "#1D1D26",
				navigation: "#1D1D27",
				"primary-card": "#21212B",
				"secondary-card": "#343343",
				"hover-card": "#272732",
				"gray-text": "#C3C3D9",
				"gray-button": "#30303D",
				"gradient1-button": "#BB3FDD",
				"gradient2-button": "#FB6DA9",
				"gradient3-button": "#FF9F7C"
			},
			borderWidth: {
				1: "1px",
				3: "3px"
			},
			fontSize: {
				xxs: ".625rem"
			},
			boxShadow: {
				button: "inset 0 -4px 0px 0 rgba(0, 0, 0, 0.25)"
			},
			height: {
				"90vh": "90vh",
				"80vh": "80vh"
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
