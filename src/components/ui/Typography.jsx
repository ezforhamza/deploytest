// src/components/ui/Typography.jsx

import React from "react";
import { typographyStyles } from "../../styles/tokens.js";

/**
 * Typography Component - Reusable text component following design system
 *
 * @param {string} variant - Typography variant (h1, h2, h3, h4, h5, h6, text, subtitle, button, small)
 * @param {string} color - Color variant (primary, secondary, dark, white, muted, warning, danger, success)
 * @param {React.ElementType} as - HTML element to render as (h1, h2, p, span, etc.)
 * @param {string} className - Additional CSS classes
 * @param {object} style - Inline styles (will override component styles)
 * @param {React.ReactNode} children - Content to render
 */
const Typography = ({
  variant = "text",
  color = "default",
  as: Component,
  className = "",
  style = {},
  children,
  ...props
}) => {
  // Auto-select appropriate HTML element if not specified
  const getDefaultElement = (variant) => {
    const elementMap = {
      h1: "h1",
      h2: "h2",
      h3: "h3",
      h4: "h4",
      h5: "h5",
      h6: "h6",
      text: "p",
      subtitle: "p",
      button: "span",
      small: "small",
    };
    return elementMap[variant] || "p";
  };

  const Element = Component || getDefaultElement(variant);

  // Get base typography styles
  const baseStyles = typographyStyles[variant] || typographyStyles.text;

  // Color class mapping
  const colorClass = color !== "default" ? `text-${color}` : "";

  // Combine CSS classes
  const cssClasses = [`typography-${variant}`, colorClass, className]
    .filter(Boolean)
    .join(" ");

  // Merge styles (style prop overrides component styles)
  const mergedStyles = {
    ...baseStyles,
    ...style,
  };

  return (
    <Element className={cssClasses} style={mergedStyles} {...props}>
      {children}
    </Element>
  );
};

// Pre-configured typography components for common use cases
export const H1 = (props) => <Typography variant="h1" as="h1" {...props} />;
export const H2 = (props) => <Typography variant="h2" as="h2" {...props} />;
export const H3 = (props) => <Typography variant="h3" as="h3" {...props} />;
export const H4 = (props) => <Typography variant="h4" as="h4" {...props} />;
export const H5 = (props) => <Typography variant="h5" as="h5" {...props} />;
export const H6 = (props) => <Typography variant="h6" as="h6" {...props} />;
export const Text = (props) => <Typography variant="text" as="p" {...props} />;
export const Subtitle = (props) => (
  <Typography variant="subtitle" as="p" {...props} />
);
export const ButtonText = (props) => (
  <Typography variant="button" as="span" {...props} />
);
export const Small = (props) => (
  <Typography variant="small" as="small" {...props} />
);

export default Typography;
