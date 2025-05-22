import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				propwise: {
					50: '#fff8e0',
					100: '#ffefad',
					200: '#ffe270',
					300: '#ffd433',
					400: '#ffc300',
					500: '#ffaa00',
					600: '#e68a00',
					700: '#cc6d00',
					800: '#b35000',
					900: '#994200',
				},
				gold: {
					50: '#fefae0',
					100: '#fff0b8',
					200: '#ffe066',
					300: '#ffd60a',
					400: '#ffc300',
					500: '#e6a800',
					600: '#cc7c00',
					700: '#a65a00',
					800: '#8c4500',
					900: '#703a00',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)"
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)"
					}
				},
				'scale-in': {
					"0%": {
						opacity: "0",
						transform: "scale(0.95)"
					},
					"100%": {
						opacity: "1",
						transform: "scale(1)"
					}
				},
				'slide-in': {
					"0%": {
						opacity: "0",
						transform: "translateX(-10px)"
					},
					"100%": {
						opacity: "1",
						transform: "translateX(0)"
					}
				},
				'slide-up': {
					"0%": {
						opacity: "0",
						transform: "translateY(10px)"
					},
					"100%": {
						opacity: "1",
						transform: "translateY(0)"
					}
				},
				'pulse-subtle': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.8'
					}
				},
				'rotate-slow': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				'shimmer': {
					'0%': {
						transform: 'translateX(-150%)',
					},
					'100%': {
						transform: 'translateX(150%)',
					},
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-20px)'
					}
				},
				'tilt': {
					'0%, 100%': {
						transform: 'rotate(-2deg)'
					},
					'50%': {
						transform: 'rotate(2deg)'
					}
				},
				'bounce-rotate': {
					'0%, 100%': {
						transform: 'translateY(0) rotate(0deg)'
					},
					'50%': {
						transform: 'translateY(-15px) rotate(3deg)'
					}
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out',
				'slide-up': 'slide-up 0.3s ease-out',
				'pulse-subtle': 'pulse-subtle 2s infinite',
				'spin-slow': 'rotate-slow 8s linear infinite',
				'shimmer': 'shimmer 2s infinite',
				'float': 'float 6s ease-in-out infinite',
				'tilt': 'tilt 6s ease-in-out infinite',
				'bounce-rotate': 'bounce-rotate 4s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
