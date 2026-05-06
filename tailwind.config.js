/** @type {import('tailwindcss').Config} */
module.exports = {
    // NOTE: Update this to include the paths to all of your component files.
    content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}"],
    presets: [require("nativewind/preset")],
    theme: {
      extend: {
        colors: {
          purple: {
            DEFAULT: "#6A11CB"
          },
          orange: {
            DEFAULT: "#FF5F00"
          },
          gray: {
            DEFAULT: "#E7E7E7",
            tab: "#F5F5F5",
            button: "#E5E5E5"
          }
        },
        fontFamily: {
          ithin: ["Inter-Thin", "sans-serif"],
          ilight: ["Inter-Light", "sans-serif"],
          ieLight: ["Inter-ExtraLight", "sans-serif"],
          iregular: ["Inter-Regular", "sans-serif"],
          imedium: ["Inter-Medium", "sans-serif"],
          ibold: ["Inter-Bold", "sans-serif"],
          isbold: ["Inter-SemiBold", "sans-serif"],
          iebold: ["Inter-ExtraBold", "sans-serif"],
          iblack: ["Inter-Black", "sans-serif"],
          pthin: ["Poppins-Thin", "sans-serif"],
          plight: ["Poppins-Light", "sans-serif"],
          peLight: ["Poppins-ExtraLight", "sans-serif"],
          pregular: ["Poppins-Regular", "sans-serif"],
          pmedium: ["Poppins-Medium", "sans-serif"],
          pbold: ["Poppins-Bold", "sans-serif"],
          psbold: ["Poppins-SemiBold", "sans-serif"],
          psboldItalic: ["Poppins-SemiBoldItalic", "sans-serif"],
          pebold: ["Poppins-ExtraBold", "sans-serif"],
          pblack: ["Poppins-Black", "sans-serif"],
        },
        animation: {
          'spin-fast': 'spin 0.5s linear infinite',
          none: 'none',
          blink: 'blink 1s ease-in-out infinite',
        },
        keyframes: {
          blink: {
            '0%, 80%, 100%': { opacity: '1' },  // visible most of the time
            '85%, 95%': { opacity: '0' },       // brief hidden moment
          },
        },
      },
    },
    plugins: [],
  }