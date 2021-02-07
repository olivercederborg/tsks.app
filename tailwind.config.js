module.exports = {
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				"primary-default": "#7578D1",
				"primary-pink": "#C97DD6",
				"primary-rose": "#D05673",
				"primary-background": "#191B21",
				"secondary-background": "#1E2027",
				"primary-card": "#21232D",
				"secondary-card": "#333644"
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
