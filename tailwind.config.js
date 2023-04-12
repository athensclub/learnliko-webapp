/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    fontFamily: { "line-seed": "LINE Seed Sans TH" },
    extend: {
      transitionProperty: {
        size: "width, height",
      },
    },
  },
  plugins: [],
};
