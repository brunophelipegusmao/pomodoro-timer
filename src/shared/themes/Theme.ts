const darkColors = {
  primary: "#b58c21", // gold-tone
  surface: "#0b0b0b", // card
  background: "#030303",
  cardBorder: "rgba(255, 255, 255, 0.08)", // border-dim
  glowBorder: "rgba(194, 165, 55, 0.4)", // border-glow
  text: "#f9f5e0",
  muted: "#1f1f1f",
  mutedText: "#c7c1b0",
  shadow: "rgba(0, 0, 0, 0.65)",
  gradientTop: "#040404",
  gradientBottom: "#111",
  accent: "#8c6d16", // gold-tone-dark
};

const lightColors = {
  primary: "#b58c21",
  surface: "#fffdfa",
  background: "#f7f3ea",
  cardBorder: "rgba(0, 0, 0, 0.12)",
  glowBorder: "rgba(194, 165, 55, 0.35)",
  text: "#1a1a17",
  muted: "#f2eee7",
  mutedText: "#6b5c3c",
  shadow: "rgba(0, 0, 0, 0.2)",
  gradientTop: "#fffdfa",
  gradientBottom: "#ece4d4",
  accent: "#8c6d16",
};

export const Theme = {
  colors: {
    light: lightColors,
    dark: darkColors,
  },
  fonts: {
    regular: "NunitoRegular",
    bold: "NunitoBold",
    italic: "NunitoItalic",
  },
  fontSizes: {
    small: 12,
    medium: 16,
    large: 24,
    xlarge: 32,
  },
};
