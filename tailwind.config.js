import daisyui from "daisyui";

export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
      extend: {
        fontFamily: {
          'inter': ['Inter', 'sans-serif'],
        },
        colors: {
          purple: {
            500: '#834efe',
            600: '#6b3edc',
            700: '#5a2bb9',
          }
        }
      },
  },
  plugins: [daisyui],
  important: true,
}