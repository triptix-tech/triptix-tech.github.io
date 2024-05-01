/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                'ttblue': '#53bff9',
                'ttpink': '#da35cc'
            }
        }
    },
    plugins: [
        require('@tailwindcss/typography')
    ],
}