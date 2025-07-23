# Design Tokens (JavaScript)

**File Path:** `src/styles/tokens.js`

## 📋 Purpose

Provides JavaScript access to all design system values. This file exports design tokens as JavaScript objects, making them available for programmatic use in React components, CSS-in-JS, and dynamic styling.

## 🎯 What It Contains

### 1. **Color Objects**

```javascript
colors.primary; // #1090CF
colors.secondary; // #67C6FF
colors.success; // #209652
// ... all color values
```

### 2. **Typography Objects**

```javascript
typography.fontSize.h1; // 5.375rem
typography.fontWeight.bold; // 700
typography.fontFamily.primary; // 'Lexend', sans-serif
```

### 3. **Spacing & Layout**

```javascript
spacing.md; // 1rem
borderRadius.lg; // 0.75rem
shadows.md; // CSS shadow string
```

### 4. **Pre-built Style Objects**

```javascript
typographyStyles.h1; // Complete CSS object for H1
typographyStyles.text; // Complete CSS object for body text
```

### 5. **Helper Functions**

```javascript
getCSSVariable(); // Get CSS custom property
responsive.mobile(); // Media query helper
```

## 🚀 How to Use

### Import Specific Tokens:

```javascript
import { colors, typography, spacing } from "./styles/tokens";

const buttonStyle = {
  backgroundColor: colors.primary,
  fontSize: typography.fontSize.button,
  padding: spacing.md,
};
```

### Import Everything:

```javascript
import tokens from "./styles/tokens";

const cardStyle = {
  backgroundColor: tokens.colors.white,
  borderRadius: tokens.borderRadius.lg,
  boxShadow: tokens.shadows.md,
};
```

### Use Pre-built Styles:

```javascript
import { typographyStyles } from "./styles/tokens";

<h1 style={typographyStyles.h1}>Title</h1>;
```

### Dynamic Styling:

```javascript
import { colors } from "./styles/tokens";

const [variant, setVariant] = useState("primary");
const buttonColor = colors[variant]; // Dynamic color selection
```

## 💡 Key Features

- **Type-Safe**: Easy to add TypeScript definitions
- **IntelliSense**: Full autocomplete support in VS Code
- **Consistent**: Same values as CSS custom properties
- **Flexible**: Works with any styling approach
- **Tree-Shakable**: Import only what you need

## 🔧 Common Use Cases

### 1. **Inline Styles**

```javascript
<div style={{
  color: colors.primary,
  fontSize: typography.fontSize.h3
}}>
```

### 2. **CSS-in-JS Libraries**

```javascript
const StyledButton = styled.button`
  background-color: ${colors.primary};
  font-size: ${typography.fontSize.button};
`;
```

### 3. **Dynamic Theming**

```javascript
const theme = {
  light: { bg: colors.white, text: colors.dark },
  dark: { bg: colors.dark, text: colors.white },
};
```

### 4. **Component Variants**

```javascript
const variants = {
  primary: { bg: colors.primary, text: colors.white },
  secondary: { bg: colors.secondary, text: colors.white },
};
```

## 📱 Responsive Helpers

```javascript
import { responsive } from "./styles/tokens";

const mobileStyles = responsive.mobile(`
  font-size: ${typography.fontSize.h6};
  padding: ${spacing.sm};
`);
```

## 🎨 Available Token Categories

- **colors**: All color values from design system
- **typography**: Font families, sizes, weights, spacing
- **spacing**: Consistent spacing scale (xs, sm, md, lg, xl)
- **borderRadius**: Corner radius values (sm, md, lg, xl)
- **shadows**: Elevation shadow styles (sm, md, lg, xl)
- **breakpoints**: Screen size breakpoints for responsive design

## 📝 Notes

- All values match the CSS custom properties exactly
- Use this for programmatic styling and dynamic themes
- Combine with CSS classes for optimal performance
- Perfect for component libraries and design systems
- Compatible with all popular CSS-in-JS solutions
