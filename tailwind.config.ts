import {
  amber,
  amberDark,
  gray,
  grayDark,
  lime,
  limeDark,
  mint,
  mintDark,
  pink,
  pinkDark,
  sky,
  skyDark,
  tomato,
  tomatoDark,
  violet,
  violetDark
} from '@radix-ui/colors';
import chroma from "chroma-js";
import type { Config } from "tailwindcss";

// ChatGPT wrote this! Mostly: https://chat.openai.com/c/f674b76f-f86e-4996-9f5e-546a0bbeb662
function splitHSLValue(hslValue: string): [number, number, number] {
  // Remove the 'hsl(' and ')' parts from the string
  const cleanedValue = hslValue.replace('hsl(', '').replace(')', '');

  // Split the string into individual values
  const [hue, saturation, lightness] = cleanedValue.split(', ').map(parseFloat);

  return [hue, saturation / 100, lightness / 100];
}

export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    // https://www.radix-ui.com/docs/colors/palette-composition/understanding-the-scale
    themes: [{
      a11y: {
        "accent-content": chroma.hsl(...splitHSLValue(mint.mint12)).hex(),
        "accent-focus": chroma.hsl(...splitHSLValue(mint.mint9)).hex(),
        "accent": chroma.hsl(...splitHSLValue(mint.mint7)).hex(),
        "base-100": chroma.hsl(...splitHSLValue(gray.gray2)).hex(),
        "base-200": chroma.hsl(...splitHSLValue(gray.gray7)).hex(),
        "base-300": chroma.hsl(...splitHSLValue(gray.gray12)).hex(),
        "base-content": chroma.hsl(...splitHSLValue(gray.gray12)).hex(),
        "error-content": chroma.hsl(...splitHSLValue(tomato.tomato12)).hex(),
        "error": chroma.hsl(...splitHSLValue(tomato.tomato9)).hex(),
        "info-content": chroma.hsl(...splitHSLValue(sky.sky12)).hex(),
        "info": chroma.hsl(...splitHSLValue(sky.sky9)).hex(),
        "neutral-content": chroma.hsl(...splitHSLValue(grayDark.gray12)).hex(),
        "neutral-focus": chroma.hsl(...splitHSLValue(grayDark.gray9)).hex(),
        "neutral": chroma.hsl(...splitHSLValue(grayDark.gray7)).hex(),
        "primary-content": chroma.hsl(...splitHSLValue(violet.violet12)).hex(),
        "primary-focus": chroma.hsl(...splitHSLValue(violet.violet9)).hex(),
        "primary": chroma.hsl(...splitHSLValue(violet.violet7)).hex(),
        "secondary-content": chroma.hsl(...splitHSLValue(pink.pink12)).hex(),
        "secondary-focus": chroma.hsl(...splitHSLValue(pink.pink9)).hex(),
        "secondary": chroma.hsl(...splitHSLValue(pink.pink7)).hex(),
        "success-content": chroma.hsl(...splitHSLValue(lime.lime12)).hex(),
        "success": chroma.hsl(...splitHSLValue(lime.lime9)).hex(),
        "warning-content": chroma.hsl(...splitHSLValue(amber.amber12)).hex(),
        "warning": chroma.hsl(...splitHSLValue(amber.amber9)).hex(),
      },
      dark: {
        "accent-content": chroma.hsl(...splitHSLValue(mintDark.mint12)).hex(),
        "accent-focus": chroma.hsl(...splitHSLValue(mintDark.mint9)).hex(),
        "accent": chroma.hsl(...splitHSLValue(mintDark.mint7)).hex(),
        "base-100": chroma.hsl(...splitHSLValue(grayDark.gray2)).hex(),
        "base-200": chroma.hsl(...splitHSLValue(grayDark.gray7)).hex(),
        "base-300": chroma.hsl(...splitHSLValue(grayDark.gray12)).hex(),
        "base-content": chroma.hsl(...splitHSLValue(grayDark.gray12)).hex(),
        "error-content": chroma.hsl(...splitHSLValue(tomatoDark.tomato12)).hex(),
        "error": chroma.hsl(...splitHSLValue(tomatoDark.tomato9)).hex(),
        "info-content": chroma.hsl(...splitHSLValue(skyDark.sky12)).hex(),
        "info": chroma.hsl(...splitHSLValue(skyDark.sky9)).hex(),
        "neutral-content": chroma.hsl(...splitHSLValue(grayDark.gray12)).hex(),
        "neutral-focus": chroma.hsl(...splitHSLValue(grayDark.gray9)).hex(),
        "neutral": chroma.hsl(...splitHSLValue(grayDark.gray7)).hex(),
        "primary-content": chroma.hsl(...splitHSLValue(violetDark.violet12)).hex(),
        "primary-focus": chroma.hsl(...splitHSLValue(violetDark.violet9)).hex(),
        "primary": chroma.hsl(...splitHSLValue(violetDark.violet7)).hex(),
        "secondary-content": chroma.hsl(...splitHSLValue(pinkDark.pink12)).hex(),
        "secondary-focus": chroma.hsl(...splitHSLValue(pinkDark.pink9)).hex(),
        "secondary": chroma.hsl(...splitHSLValue(pinkDark.pink7)).hex(),
        "success-content": chroma.hsl(...splitHSLValue(limeDark.lime12)).hex(),
        "success": chroma.hsl(...splitHSLValue(limeDark.lime9)).hex(),
        "warning-content": chroma.hsl(...splitHSLValue(amberDark.amber12)).hex(),
        "warning": chroma.hsl(...splitHSLValue(amberDark.amber9)).hex(),
      }
    }],
  }
} satisfies Config;
