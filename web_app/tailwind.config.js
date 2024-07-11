/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./*.html"],
    theme: {
        extend: {},
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    "primary": "#facc15",
                    "secondary": "#eab308",
                    "accent": "#b91c1c",
                    "neutral": "#fef9c3",
                },
            },
        ],
    },
    plugins: [
        require('daisyui'),
    ],
}

