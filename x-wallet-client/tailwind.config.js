import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6500',
        secondary: '#fecc00',
      },
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          'primary': '#ff6500',
          'primary-focus': '#e55b00',
          'primary-content': '#ffffff',
          'secondary': '#fecc00',
          'secondary-focus': '#e6b800',
          'secondary-content': '#ffffff',
        },
      },
    ],
  },
}
