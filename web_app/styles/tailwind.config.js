/** @type {import('./tailwindcss').Config} */
module.exports = {
    content: ["./*.html"],
    theme: {
        extend: {},
    },
    daisyui: {
    },
    plugins: [
        require('daisyui'),
    ],
}

