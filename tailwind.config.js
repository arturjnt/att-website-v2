// tailwind.config.cjs
module.exports = {
  mode: "jit",
  content: [
    "./public/**/*.html",
    "./src/**/*.{astro,js,jsx,svelte,ts,tsx,vue}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000000",
      white: "#FFFFFF",
      orange: { light: "#EEC170", DEFAULT: "#F2A65A", dark: "#F58549" },
      blue: {
        light: "rgba(70, 78, 95, 0.05)",
        DEFAULT: "#464E5F",
        dark: "#2F3644",
        fields: "rgb(245, 246, 247)",
      },
      grey: { DEFAULT: "#C4C4C4" },
    },
  },
};
