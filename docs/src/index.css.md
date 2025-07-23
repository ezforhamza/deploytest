# Global Styles & CSS Reset

**File Path:** `src/index.css`

## 📋 Purpose

The main stylesheet that imports the design system and provides global styles, CSS reset, and utility classes. This file ensures consistent baseline styles across all browsers and applies design system defaults to HTML elements.

## 🎯 What It Contains

### 1. **Design System Import**

- Imports `design-system.css` to load all design tokens
- Makes CSS custom properties available globally

### 2. **CSS Reset & Normalization**

- Box-sizing reset for consistent layout behavior
- Removes default margins and paddings
- Consistent font rendering across browsers
- Smooth scrolling behavior

### 3. **Base HTML Element Styles**

- Headings (h1-h6) styled with design system typography
- Paragraphs with consistent text styling
- Links with brand colors and focus states
- Form elements with design system fonts

### 4. **Utility Classes**

- Layout utilities (flex, grid, positioning)
- Spacing utilities (margins, padding)
- Visual utilities (shadows, border radius)
- Responsive helpers (hide/show on mobile/desktop)

### 5. **Component Animations**

- Smooth transitions for interactive elements
- Hover effects (scale, lift)
- Focus ring styles for accessibility

## 🚀 How It Works

### Automatic Import:

This file is automatically imported in your `main.jsx`:

```javascript
import "./index.css";
```

### HTML Elements Get Design System Styles:

```html
<!-- These automatically use design system styles -->
<h1>Styled with design system</h1>
<p>Consistent paragraph styling</p>
<a href="#">Brand-colored links</a>
```

### Utility Classes Available Everywhere:

```html
<div class="flex items-center justify-between">
  <h2 class="mb-lg">Title with margin</h2>
  <button class="rounded-lg shadow-md">Styled button</button>
</div>
```

## 💡 Key Features

- **Zero Configuration**: Works automatically once imported
- **Cross-Browser Consistency**: Normalizes differences between browsers
- **Design System Integration**: HTML elements use design tokens
- **Utility-First**: Common classes available without extra CSS
- **Accessibility**: Focus states and screen reader utilities
- **Performance**: Lightweight and optimized

## 🔧 Utility Classes Reference

### Layout:

```css
.flex              /* display: flex */
/* display: flex */
.flex-col          /* flex-direction: column */
.grid              /* display: grid */
.items-center      /* align-items: center */
.justify-center    /* justify-content: center */
.justify-between; /* justify-content: space-between */
```

### Spacing:

```css
.mb-xs, .mb-sm, .mb-md, .mb-lg, .mb-xl    /* margin-bottom */
.mt-xs, .mt-sm, .mt-md, .mt-lg, .mt-xl    /* margin-top */  
.p-xs, .p-sm, .p-md, .p-lg, .p-xl; /* padding */
```

### Visual:

```css
.rounded-sm, .rounded-md, .rounded-lg, .rounded-xl    /* border-radius */
.shadow-sm, .shadow-md, .shadow-lg, .shadow-xl; /* box-shadow */
```

### Responsive:

```css
.hidden-mobile     /* Hide on mobile devices */
/* Hide on mobile devices */
.hidden-desktop; /* Hide on desktop devices */
```

### Interactive:

```css
.transition        /* Smooth transitions */
/* Smooth transitions */
.hover-scale       /* Scale on hover */
.hover-lift        /* Lift on hover */
.focus-ring; /* Focus outline */
```

## 📱 Responsive Behavior

### Mobile Optimizations:

- Container padding adjusts for smaller screens
- Typography scales appropriately
- Utility classes work across all screen sizes

### Accessibility Features:

- Focus rings for keyboard navigation
- Screen reader only content (`.sr-only`)
- High contrast focus states
- Reduced motion preferences respected

## 🎨 HTML Element Defaults

### Headings:

```html
<h1>Uses typography-h1 styles automatically</h1>
<h2>Uses typography-h2 styles automatically</h2>
<!-- All headings get design system styling -->
```

### Text:

```html
<p>Consistent paragraph styling with design system fonts</p>
<a>Links use primary color with hover effects</a>
```

### Forms:

```html
<input />
<!-- Design system font family -->
<button>
  <!-- Design system button typography -->
  <select>
    <!-- Consistent styling -->
  </select>
</button>
```

## 🔧 Customization

### Adding New Utilities:

Add new utility classes at the bottom of the file:

```css
.my-custom-utility {
  /* Your styles here */
}
```

### Overriding Defaults:

Place overrides after the design system import:

```css
@import "./styles/design-system.css";

/* Custom overrides */
h1 {
  /* Your custom h1 styles */
}
```

## 📝 Best Practices

1. **Import First**: This should be the first CSS import in your app
2. **Use Utilities**: Prefer utility classes over custom CSS when possible
3. **Semantic HTML**: Let default element styles work for you
4. **Test Accessibility**: Ensure focus states and screen readers work
5. **Check Mobile**: Test responsive behavior on different screen sizes

## 🔄 File Dependencies

- **Requires**: `src/styles/design-system.css`
- **Used by**: All components and pages in the app
- **Imports**: Google Fonts (via design-system.css)

## 📝 Notes

- This file creates the foundation for all other styles
- Changes here affect the entire application
- Utility classes follow a consistent naming convention
- All styles are mobile-first and responsive
- Focus on accessibility and cross-browser compatibility
