import type { Config } from "tailwindcss";

const config: Config = {
 content: [
   "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        // "gradient-conic":
        //   "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          // 'hero-pattern': "url('image1.png')",
            // 'footer-texture': "url('/img/footer-texture.png')",
      },
      backgroundColor:{
        'primary': '#3C3C3C',
        'nav_color': '#37140F',
      }
    },
  },
  plugins: [],
};
export default config;
