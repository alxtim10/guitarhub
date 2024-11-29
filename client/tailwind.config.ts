import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        title: '#18191F',
        subtitle: '#5B616E',
        greyMain: '#414141',
        greySecondary: '#919191',
        primary: '#0182FF'
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
