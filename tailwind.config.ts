import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#F5F5F5',
				secondary: '#F2EAD3',
				tertiary: '#DFD7BF',
				quaternary: '#3F2305',
				'color-placeholder': '#9CA3AF',
				'gradient-one': '#8E2DE2',
				'gradient-two': '#4A00E0',
			},
			fontSize: {
				xxs: '10px',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	plugins: [],
};
export default config;
