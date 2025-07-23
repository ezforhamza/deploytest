# Design System CSS

**File Path:** `src/styles/design-system.css`

## 📋 Purpose

This file contains all the foundational design tokens and utility classes for the project. It defines the visual language of the application including colors, typography, spacing, and component styles.

## 🎯 What It Contains

### 1. **CSS Custom Properties (Design Tokens)**

- **Colors**: Primary, secondary, neutral, and status colors
- **Typography**: Font families, sizes, weights, letter spacing
- **Spacing**: Consistent spacing scale for margins and padding
- **Border Radius**: Standardized corner radius values
- **Shadows**: Elevation system for depth

### 2. **Typography Classes**

- `.typography-h1` through `.typography-h6` - Heading styles
- `.typography-text` - Body text
- `.typography-subtitle` - Secondary text
- `.typography-button` - Button text
- `.typography-small` - Small text

### 3. **Color Utility Classes**

- `.text-primary`, `.text-secondary`, etc. - Text colors
- `.bg-primary`, `.bg-secondary`, etc. - Background colors

### 4. **Responsive Typography**

- Mobile-optimized font sizes
- Automatic scaling for different screen sizes

## 🚀 How to Use

### Import in your main CSS:

```css
@import "./styles/design-system.css";
```

### Use CSS Custom Properties:

```css
.my-component {
  color: var(--color-primary);
  font-size: var(--font-size-h3);
  padding: var(--spacing-md);
}
```

### Use Utility Classes:

```html
<h1 class="typography-h1 text-primary">Page Title</h1>
<p class="typography-text text-muted">Body text</p>
```

## 💡 Key Features

- **Figma-Accurate**: Matches design tokens exactly from Figma
- **CSS Variables**: Modern, performant approach to theming
- **Mobile-First**: Responsive typography that scales properly
- **Utility-First**: Pre-built classes for common use cases
- **Consistent**: Ensures visual consistency across the app

## 🔧 Customization

To modify colors or typography:

1. Update the CSS custom properties in the `:root` section
2. Changes will automatically apply throughout the app
3. No need to update individual components

## 📱 Responsive Behavior

- Font sizes automatically scale down on mobile devices
- Spacing adjusts appropriately for smaller screens
- Typography remains readable at all viewport sizes

## 🎨 Color System

- **Primary**: `#1090CF` - Main brand color
- **Secondary**: `#67C6FF` - Accent color
- **Success**: `#209652` - Success states
- **Warning**: `#F1C84E` - Warning states
- **Danger**: `#EB5757` - Error states
- **Text**: `#58606C` - Default text color

## 📝 Notes

- This file should be imported before any other CSS files
- All measurements use `rem` units for better accessibility
- Font loading is handled automatically via Google Fonts import
- Works with both class-based and CSS-in-JS approaches
