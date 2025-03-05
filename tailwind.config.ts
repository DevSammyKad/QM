import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/media/bg-lab-test.png')",
        "green-gradient":
          "linear-gradient(0deg, #f8f8f8 0%, rgba(21,169,160,.3) 40%, rgba(21,169,160,.3) 100%)",
      },
      colors: {
        shade: "#90A4AE",
        "purple-light": "#EBE1FF",
        "blue-light": "#D6EDFF",
        "red-light": "#FFDADC",
        "input-blue": "rgba(230, 238, 248, 1)",
        "border-shade": "#90A4AE80",
        "body-gray": "#f8f8f8",
      },
      boxShadow: {
        "product-card":
          "0px 2px 4px 0px rgba(0, 0, 0, 0.02), 0px 0px 6px 0px rgba(0, 0, 0, 0.02)",
        input:
          "4px 4px 12px 0px rgba(187, 195, 206, 0.6), -4px -4px 12px 0px rgba(253, 255, 255, 0.8)",
      },
    },
  },
  plugins: [
    nextui({
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            background: "#FFFFFF", // or DEFAULT
            foreground: "#90A4AE",
            primary: {
              DEFAULT: "#15A9A0",
              "50": "#E3F5F4",
              "100": "#B9E5E3",
              "200": "#8AD4D0",
              "300": "#5BC3BD",
              "400": "#38B6AE",
              "500": "#15A9A0",
              "600": "#12A298",
              "700": "#0F988E",
              "800": "#0C8F84",
              "900": "#067E73",
            },
            secondary: {
              DEFAULT: "#F26522",
              "50": "#FDEDE4",
              "100": "#FBD1BD",
              "200": "#F9B291",
              "300": "#F69364",
              "400": "#F47C43",
              "500": "#F26522",
              "600": "#F05D1E",
              "700": "#EE5319",
              "800": "#EC4914",
            },
          },
        },
      },
    }),
  ],
};
export default config;
