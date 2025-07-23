// src/styles/tokens.js

/**
 * Design Tokens - JavaScript exports
 * Use these for programmatic access to design values in React components
 */

export const colors = {
  // Primary Colors
  primary: "#1090CF",
  primaryRgb: "16, 144, 207",

  // Secondary Colors
  secondary: "#67C6FF",
  secondaryLight: "#D2F5FF",
  secondaryOrange: "#E69C24",

  // Neutral Colors
  dark: "#000000",
  text: "#58606C",
  white: "#FFFFFF",

  // Status Colors
  warning: "#F1C84E",
  danger: "#EB5757",
  success: "#209652",
};

export const typography = {
  fontFamily: {
    primary:
      "'Lexend', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },

  fontSize: {
    h1: "5.375rem", // ~86px
    h2: "3.125rem", // ~50px
    h3: "1.75rem", // ~28px
    h4: "1.9531rem", // ~31.25px
    h5: "1.5625rem", // ~25px
    h6: "1.25rem", // ~20px
    text: "1rem", // ~16px
    subtitle: "0.8rem", // ~12.8px
    button: "0.8331rem", // ~13.33px
    small: "0.64rem", // ~10.24px
  },

  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  letterSpacing: {
    tight: "-1.5%",
    normal: "-0.5%",
    none: "0%",
  },

  lineHeight: {
    tight: 1.1,
    normal: 1.5,
    relaxed: 1.6,
  },
};

export const spacing = {
  xs: "0.25rem", // 4px
  sm: "0.5rem", // 8px
  md: "1rem", // 16px
  lg: "1.5rem", // 24px
  xl: "2rem", // 32px
  "2xl": "3rem", // 48px
  "3xl": "4rem", // 64px
};

export const borderRadius = {
  sm: "0.25rem", // 4px
  md: "0.5rem", // 8px
  lg: "0.75rem", // 12px
  xl: "1rem", // 16px
};

export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
  xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
};

// Breakpoints for responsive design
export const breakpoints = {
  mobile: "480px",
  tablet: "768px",
  desktop: "1024px",
  wide: "1200px",
};

// CSS-in-JS style objects for common typography styles
export const typographyStyles = {
  h1: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.h1,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: typography.letterSpacing.tight,
    lineHeight: typography.lineHeight.tight,
    margin: 0,
    color: colors.dark,
  },

  h2: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.h2,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: typography.letterSpacing.normal,
    lineHeight: typography.lineHeight.tight,
    margin: 0,
    color: colors.dark,
  },

  h3: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.h3,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: typography.letterSpacing.none,
    lineHeight: typography.lineHeight.tight,
    margin: 0,
    color: colors.dark,
  },

  h4: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.h4,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: typography.letterSpacing.none,
    lineHeight: typography.lineHeight.tight,
    margin: 0,
    color: colors.dark,
  },

  h5: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.h5,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: typography.letterSpacing.none,
    lineHeight: typography.lineHeight.tight,
    margin: 0,
    color: colors.dark,
  },

  h6: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.h6,
    fontWeight: typography.fontWeight.bold,
    letterSpacing: typography.letterSpacing.none,
    lineHeight: typography.lineHeight.tight,
    margin: 0,
    color: colors.dark,
  },

  text: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.text,
    fontWeight: typography.fontWeight.regular,
    letterSpacing: typography.letterSpacing.none,
    lineHeight: typography.lineHeight.normal,
    margin: 0,
    color: colors.text,
  },

  subtitle: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.subtitle,
    fontWeight: typography.fontWeight.regular,
    letterSpacing: typography.letterSpacing.none,
    lineHeight: typography.lineHeight.normal,
    margin: 0,
    color: colors.text,
  },

  button: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.button,
    fontWeight: typography.fontWeight.regular,
    letterSpacing: typography.letterSpacing.none,
    lineHeight: typography.lineHeight.normal,
    margin: 0,
    color: colors.text,
  },

  small: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.small,
    fontWeight: typography.fontWeight.regular,
    letterSpacing: typography.letterSpacing.none,
    lineHeight: typography.lineHeight.normal,
    margin: 0,
    color: colors.text,
  },
};

// Helper function to get CSS custom property
export const getCSSVariable = (variableName) => {
  return `var(--${variableName})`;
};

// Helper function to create responsive styles
export const responsive = {
  mobile: (styles) => `@media (max-width: ${breakpoints.mobile}) { ${styles} }`,
  tablet: (styles) => `@media (max-width: ${breakpoints.tablet}) { ${styles} }`,
  desktop: (styles) =>
    `@media (min-width: ${breakpoints.desktop}) { ${styles} }`,
  wide: (styles) => `@media (min-width: ${breakpoints.wide}) { ${styles} }`,
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  breakpoints,
  typographyStyles,
  getCSSVariable,
  responsive,
};
