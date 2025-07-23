# Typography Component

**File Path:** `src/components/ui/Typography.jsx`

## 📋 Purpose

A flexible, reusable typography component that ensures consistent text styling across the application. It automatically applies design system typography styles while allowing customization for specific use cases.

## 🎯 What It Contains

### 1. **Main Typography Component**

- Configurable variant, color, and HTML element
- Automatic design system integration
- Support for custom styles and CSS classes

### 2. **Pre-configured Components**

- `H1`, `H2`, `H3`, `H4`, `H5`, `H6` - Heading components
- `Text` - Body text component
- `Subtitle` - Secondary text component
- `ButtonText` - Button text component
- `Small` - Small text component

## 🚀 How to Use

### Import Components:

```javascript
import Typography, {
  H1,
  H2,
  Text,
  ButtonText,
} from "./components/ui/Typography";
```

### Basic Usage:

```javascript
<H1>Page Title</H1>
<H2>Section Title</H2>
<Text>Regular paragraph text</Text>
<ButtonText>Button label</ButtonText>
```

### With Colors:

```javascript
<H1 color="primary">Primary Title</H1>
<Text color="muted">Secondary information</Text>
<Text color="success">Success message</Text>
<Text color="danger">Error message</Text>
```

### Custom HTML Elements:

```javascript
<Typography variant="h2" as="h1">H2 styling on H1 element</Typography>
<Typography variant="text" as="span">Inline text</Typography>
```

### With Custom Styles:

```javascript
<H3 style={{ marginBottom: "2rem", textAlign: "center" }}>
  Centered title with custom margin
</H3>
```

### With CSS Classes:

```javascript
<Text className="mb-lg text-center">Text with utility classes</Text>
```

## 🎨 Available Props

### Typography Component Props:

| Prop        | Type              | Default   | Description                                                                      |
| ----------- | ----------------- | --------- | -------------------------------------------------------------------------------- |
| `variant`   | string            | 'text'    | Typography style (h1, h2, h3, h4, h5, h6, text, subtitle, button, small)         |
| `color`     | string            | 'default' | Color variant (primary, secondary, dark, white, muted, warning, danger, success) |
| `as`        | React.ElementType | auto      | HTML element to render (h1, h2, p, span, div, etc.)                              |
| `className` | string            | ''        | Additional CSS classes                                                           |
| `style`     | object            | {}        | Inline styles (overrides component styles)                                       |
| `children`  | React.ReactNode   | -         | Content to display                                                               |

### Pre-configured Components:

All pre-configured components (`H1`, `H2`, `Text`, etc.) accept the same props except `variant` and `as`, which are pre-set.

## 💡 Key Features

- **Design System Integration**: Automatically uses design tokens
- **Flexible HTML Elements**: Render any element with any typography style
- **Color System**: Built-in color variants from design system
- **Style Override**: Custom styles take precedence when needed
- **Accessibility**: Semantic HTML elements by default
- **TypeScript Ready**: Easy to add type definitions

## 🔧 Common Use Cases

### 1. **Page Headings**

```javascript
<H1>Welcome to Our App</H1>
<H2 color="primary">Get Started</H2>
```

### 2. **Card Content**

```javascript
<div className="card">
  <H4>Card Title</H4>
  <Text color="muted">Card description text</Text>
  <ButtonText>Learn More</ButtonText>
</div>
```

### 3. **Status Messages**

```javascript
<Text color="success">✓ Profile updated successfully</Text>
<Text color="danger">✗ Please fix the errors below</Text>
<Text color="warning">⚠ This action cannot be undone</Text>
```

### 4. **Navigation**

```javascript
<Typography variant="button" as="a" color="primary">
  Navigation Link
</Typography>
```

### 5. **Custom Combinations**

```javascript
<Typography
  variant="h3"
  as="h2"
  color="secondary"
  className="text-center mb-lg"
>
  Custom styled heading
</Typography>
```

## 📱 Responsive Behavior

- Typography automatically scales on mobile devices
- Font sizes adjust based on CSS media queries
- Line heights optimize for readability at all screen sizes

## 🎨 Available Colors

- `primary` - Main brand color (#1090CF)
- `secondary` - Accent color (#67C6FF)
- `dark` - Dark text (#000000)
- `white` - White text (#FFFFFF)
- `muted` - Muted text (#58606C)
- `success` - Success green (#209652)
- `warning` - Warning yellow (#F1C84E)
- `danger` - Error red (#EB5757)

## 📝 Best Practices

1. **Use semantic HTML**: Let the component choose appropriate elements
2. **Prefer pre-configured components**: Use `H1`, `Text`, etc. instead of main component
3. **Use color props**: Instead of custom CSS for colors
4. **Combine with utility classes**: For spacing and layout
5. **Override sparingly**: Use custom styles only when necessary

## 🔄 Extending the Component

To add new typography variants:

1. Add the variant to `typographyStyles` in `tokens.js`
2. Add the variant to the Typography component
3. Create a pre-configured component if needed
4. Update the CSS classes in `design-system.css`
