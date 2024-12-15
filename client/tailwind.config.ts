/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			shade: {
  				'100': '#FFF0F3',
  				'200': '#FFD6E0',
  				'300': '#FFAACF',
  				'400': '#FF85B3',
  				'500': '#F65D8A'
  			},
  			normal: '#4B4F56',
  			alert: '#D72638',
  			softWhite: '#FFF5F7',
  			romanticRed: '#E63946',
  			blush: '#FFB3C6',
  			mutedPink: '#F5A3B7'
  		},
  		fontFamily: {
  			spaceGrotsek: [
  				'Space Grotesk',
  				'sans-serif'
  			],
  			romance: [
  				'Playfair Display',
  				'serif'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
