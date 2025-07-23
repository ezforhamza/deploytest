# Button Component

**File Path:** `src/components/ui/Button.jsx`

## 📋 Purpose

A reusable button component that matches the Figma designs. Provides consistent styling, multiple variants, and interactive states for all button use cases in the application.

## 🚀 How to Use

### Import:

```javascript
import Button from "./components/ui/Button";
```

### Basic Usage:

```javascript
<Button>Log in</Button>
<Button>Create Account</Button>
<Button>Pay</Button>
<Button>Upgrade Now</Button>
```

### With Props:

```javascript
<Button variant="primary" size="default" fullWidth>
  Create Account
</Button>

<Button variant="outline" size="small">
  Cancel
</Button>

<Button disabled>
  Loading...
</Button>
```

## 🎨 Available Props

| Prop        | Type                                  | Default   | Description                  |
| ----------- | ------------------------------------- | --------- | ---------------------------- |
| `children`  | React.ReactNode                       | -         | Button content/text          |
| `variant`   | 'primary' \| 'secondary' \| 'outline' | 'primary' | Visual style variant         |
| `size`      | 'small' \| 'default' \| 'large'       | 'default' | Button size                  |
| `fullWidth` | boolean                               | false     | Take full width of container |
| `disabled`  | boolean                               | false     | Disable button interactions  |
| `onClick`   | function                              | -         | Click handler function       |
| `type`      | 'button' \| 'submit' \| 'reset'       | 'button'  | HTML button type             |
| `className` | string                                | ''        | Additional CSS classes       |

## 🎯 Variants

### Primary (Default):

```javascript
<Button variant="primary">Primary Button</Button>
```

- Blue background (#1090CF)
- White text
- Default for main actions

### Secondary:

```javascript
<Button variant="secondary">Secondary Button</Button>
```

- Light blue background (#67C6FF)
- White text
- For secondary actions

### Outline:

```javascript
<Button variant="outline">Outline Button</Button>
```

- Transparent background
- Blue border and text
- For less prominent actions

## 📏 Sizes

### Small:

```javascript
<Button size="small">Small Button</Button>
```

- Height: 36px
- Compact padding

### Default:

```javascript
<Button size="default">Default Button</Button>
```

- Height: 48px
- Standard padding

### Large:

```javascript
<Button size="large">Large Button</Button>
```

- Height: 56px
- Generous padding

## 🔧 Common Use Cases

### Form Buttons:

```javascript
<Button type="submit" fullWidth>
  Create Account
</Button>

<Button variant="outline" type="button">
  Cancel
</Button>
```

### Action Buttons:

```javascript
<Button onClick={handleLogin}>
  Log in
</Button>

<Button onClick={handlePayment} disabled={isProcessing}>
  {isProcessing ? 'Processing...' : 'Pay'}
</Button>
```

### Full Width:

```javascript
<Button fullWidth>Upgrade Now</Button>
```

## ✨ Interactive States

- **Hover**: Slight lift effect with shadow
- **Focus**: Blue outline for keyboard navigation
- **Disabled**: Reduced opacity, no interactions
- **Click**: Smooth transitions

## 🎨 Design System Integration

- Uses design system colors from `tokens.js`
- Applies consistent typography and spacing
- Follows Figma design specifications exactly
- Responsive and accessible by default

## 📝 Notes

- All buttons use Lexend font family
- Hover effects disabled when button is disabled
- Focus states ensure keyboard accessibility
- Smooth transitions for better user experience
- Matches the exact styling from Figma designs
