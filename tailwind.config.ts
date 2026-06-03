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
				primary: 'oklch(96% 0.018 69)',
				secondary: 'oklch(91% 0.035 62)',
				tertiary: 'oklch(82% 0.055 55)',
				quaternary: 'oklch(27% 0.065 344)',
				'color-placeholder': '#9CA3AF',
				paper: 'var(--paper)',
				canvas: 'var(--canvas)',
				ink: 'var(--ink)',
				muted: 'var(--muted)',
				clay: 'var(--clay)',
				plum: 'var(--plum)',
				terracotta: 'var(--terracotta)',
				marigold: 'var(--marigold)',
				'gradient-one': 'var(--terracotta)',
				'gradient-two': 'var(--plum)',
			},
			fontSize: {
				xxs: '12px',
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
