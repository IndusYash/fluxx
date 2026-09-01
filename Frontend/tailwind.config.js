import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: ["./index.html","./src/**/*.{ts,tsx}"],
  theme: {
  	extend: {
  		fontFamily: {
					sans: [
						'Space Grotesk',
						'sans-serif'
					],
  			display: [
						'Space Grotesk',
						'sans-serif'
  			],
  			heading: [
						'Space Grotesk',
  				'sans-serif'
  			]
  		},
  		colors: {
  			bg: 'hsl(var(--bg))',
  			fg: 'hsl(var(--fg))',
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'grid': 'radial-gradient(circle at 1px 1px, hsl(var(--grid-dot)) 1px, transparent 0)',
  			'radial': 'radial-gradient(60% 50% at 50% 0%, hsl(var(--radial)) 0%, transparent 60%)',
  			'glow': 'conic-gradient(from 180deg at 50% 50%, hsl(var(--accent)/0.2), transparent 30%)'
  		},
  		boxShadow: {
  			glow: '0 0 0 1px hsl(var(--accent)/0.2), 0 8px 40px hsl(var(--accent)/0.12)'
  		},
  		borderRadius: {
  			xl: '1rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
 		keyframes: {
 			'fade-in-up': {
 				'0%': { opacity: '0', transform: 'translateY(20px)' },
 				'100%': { opacity: '1', transform: 'translateY(0)' },
 			},
 			shake: {
 				'0%, 100%': { transform: 'translateX(0)' },
 				'25%': { transform: 'translateX(-4px)' },
 				'75%': { transform: 'translateX(4px)' },
 			},
 			shimmer: {
 				'100%': { transform: 'translateX(100%)' },
 			}
 		},
 		animation: {
 			'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
 			'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
 			shake: 'shake 0.4s ease-in-out',
 			shimmer: 'shimmer 2s infinite',
 		}
  	}
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config
