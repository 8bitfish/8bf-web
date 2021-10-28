import convert from "color-convert";
import { Shade, Shades } from "../../../global";

const generateShade = (color: string, percent: number): string => {
  const [r, g, b]: number[] = [
    parseInt(color.substring(1, 3), 16),
    parseInt(color.substring(3, 5), 16),
    parseInt(color.substring(5, 7), 16),
  ].map((c) => {
    const p: number = (c * (100 + percent)) / 100;
    return p > 255 ? 255 : p;
  });

  return `#${convert.rgb.hex([r, g, b])}`;
};

function getHue(hex: string, degree: number) {
  let [h, s, l] = convert.hex.hsl(hex);
  h += degree;
  if (h > 360) {
    h -= 360;
  } else if (h < 0) {
    h += 360;
  }
  const hexR = convert.hsl.hex([h, s, l]);
  return `#${hexR}`;
}

export const getShades = ([p, s]: [string, string]): Shades => {
  const [primary, secondary]: Shade[] = [p, s].map((c) => {
    const hue: string = getHue(c, 20);

    return {
      base: c,
      light: generateShade(c, 10),
      maxLight: generateShade(c, 20),
      dark: generateShade(c, -10),
      maxDark: generateShade(c, -20),
      bg: `#${convert.hsl.hex([convert.hex.hsl(c)[0], 100, 92])}`,
      hue: {
        base: hue,
        light: generateShade(hue, 10),
        dark: generateShade(hue, -10),
      },
    };
  });
  return { primary, secondary };
};
