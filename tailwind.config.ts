/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'

module.exports = {
    darkMode: ['class'],
    content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
            },
            screens: {
                '3xl': '1920px',
            },
        },
        extend: {
            textShadow: {
                sm: '0 1px 2px var(--tw-shadow-color)',
                DEFAULT: '0 2px 4px var(--tw-shadow-color)',
                lg: '0 8px 16px var(--tw-shadow-color)',
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        require('@tailwindcss/forms'),
        require('tailwindcss-debug-screens'), // only for development
        plugin(function ({ addBase, theme }) {
            addBase({
                h1: { fontSize: theme('fontSize.2xl') },
                h2: { fontSize: theme('fontSize.xl') },
                h3: { fontSize: theme('fontSize.lg') },
                body: { cursor: 'default', backgroundColor: theme('colors.background'), fontSize: theme('fontSize.base') },
            })
        }),
        plugin(function ({ addUtilities }) {
            addUtilities({
                /* Hide scrollbar for Chrome, Safari, and Opera */
                '.no-scrollbar::-webkit-scrollbar': {
                    display: 'none',
                },

                /* Hide scrollbar for IE, Edge, and Firefox */
                '.no-scrollbar': {
                    '-ms-overflow-style': 'none' /* IE and Edge */,
                    scrollbarWidth: 'none' /* Firefox */,
                },
            })
        }),
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                {
                    'text-shadow': (value) => ({
                        textShadow: value,
                    }),
                },
                { values: theme('textShadow') },
            )
        }),
        plugin(function ({ addComponents }) {
            addComponents({
                /* Reusable tailwind class btn */
                '.btn': {
                    padding: '0.5rem 1rem',
                    fontWeight: '700',
                    border: '1px solid #000',
                },
            })
        }),
    ],
}
