module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        tokens: "repeat(auto-fill,minmax(50px,1fr))",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
