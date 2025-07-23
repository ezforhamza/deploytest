# Link Component

**File Path:** `src/components/ui/Link.jsx`

## 📋 Purpose

A versatile link component for navigation and actions in the signin flow. Handles both traditional links (with href) and button-like links (with onClick) while maintaining consistent styling and accessibility.

## 🚀 How to Use

### Import:

```javascript
import Link from "./components/ui/Link";
```

### Navigation Links:

```javascript
<Link href="/signup">Sign up</Link>
<Link href="/forgot-password">Forgot Password?</Link>
```

### Action Links (Button-like):

```javascript
<Link onClick={handleForgotPassword}>Forgot Password?</Link>
<Link onClick={handleResendCode}>Resend code</Link>
<Link onClick={handleBackToLogin}>← Back to login</Link>
```

### Different Variants:

```javascript
<Link variant="primary">Primary Link</Link>
<Link variant="muted">Muted Link</Link>
<Link variant="secondary">Secondary Link</Link>
```

### With Underline:

```javascript
<Link underline>Underlined Link</Link>
```

## 🎨 Available Props

| Prop        | Type                                          | Default   | Description                      |
| ----------- | --------------------------------------------- | --------- | -------------------------------- |
| `children`  | React.ReactNode                               | -         | Link text/content                |
| `href`      | string                                        | '#'       | URL destination (for navigation) |
| `onClick`   | function                                      | -         | Click handler (for actions)      |
| `variant`   | 'primary' \| 'secondary' \| 'muted' \| 'dark' | 'primary' | Color variant                    |
| `size`      | 'small' \| 'default' \| 'large'               | 'default' | Text size                        |
| `underline` | boolean                                       | false     | Show underline by default        |
| `disabled`  | boolean                                       | false     | Disable the link                 |
| `className` | string                                        | ''        | Additional CSS classes           |

## 🎯 Variants

### Primary (Default):

```javascript
<Link variant="primary">Forgot Password?</Link>
```

- Blue color (#1090CF)
- Used for important actions

### Secondary:

```javascript
<Link variant="secondary">Secondary Link</Link>
```

- Light blue color (#67C6FF)
- For less prominent actions

### Muted:

```javascript
<Link variant="muted">Sign up</Link>
```

- Gray text color (#58606C)
- For subtle links

### Dark:

```javascript
<Link variant="dark">Back to login</Link>
```

- Dark color (#000000)
- For high contrast text

## 📏 Sizes

### Small:

```javascript
<Link size="small">Small link text</Link>
```

### Default:

```javascript
<Link size="default">Regular link text</Link>
```

### Large:

```javascript
<Link size="large">Large link text</Link>
```

## 🔧 Common Use Cases (from Figma)

### Forgot Password Link:

```javascript
<Link variant="primary" onClick={() => navigate("/forgot-password")}>
  Forgot Password?
</Link>
```

### Sign Up Link:

```javascript
<div>
  Don't have an account?{" "}
  <Link variant="primary" onClick={() => navigate("/signup")}>
    Sign up
  </Link>
</div>
```

### Resend Code Link:

```javascript
<div>
  Didn't receive a code?{" "}
  <Link variant="primary" onClick={handleResendCode} disabled={isResending}>
    Resend code
  </Link>
</div>
```

### Back Navigation:

```javascript
<Link variant="muted" onClick={() => navigate("/login")}>
  ← Back to login
</Link>
```

### Cancel Action:

```javascript
<Link variant="muted" onClick={handleCancel}>
  Cancel
</Link>
```

## ✨ Features

### Smart Rendering:

- **With href**: Renders as `<a>` tag for navigation
- **With onClick only**: Renders as `<button>` for actions
- **Accessibility**: Proper keyboard navigation and screen reader support

### Interactive States:

- **Hover**: Slight opacity change and underline appear
- **Focus**: Blue outline for keyboard navigation
- **Disabled**: Reduced opacity and no interactions

### Consistent Styling:

- Uses design system colors and typography
- Smooth transitions for better UX
- Proper contrast ratios for accessibility

## 🎨 Design System Integration

### Colors from Design System:

- **Primary**: Main brand blue for important actions
- **Secondary**: Light blue for secondary actions
- **Muted**: Gray for subtle links
- **Dark**: Black for high contrast

### Typography:

- Uses Lexend font family
- Consistent font weights and sizes
- Proper line heights for readability

## 📱 Responsive Behavior

- Touch-friendly on mobile devices
- Appropriate font sizes across screen sizes
- Consistent spacing and alignment

## 🎯 Accessibility Features

- **Keyboard Navigation**: Tab, Enter, and Space key support
- **Focus Indicators**: Clear visual focus states
- **Screen Readers**: Proper semantic HTML
- **Disabled State**: Prevents interaction when disabled

## 📝 Integration Examples

### In Forms:

```javascript
<form onSubmit={handleLogin}>
  <Input type="email" />
  <Input type="password" />

  <div style={{ textAlign: "right", margin: "8px 0" }}>
    <Link onClick={() => setShowForgotPassword(true)}>Forgot Password?</Link>
  </div>

  <Button type="submit">Log in</Button>

  <div style={{ textAlign: "center", marginTop: "16px" }}>
    Don't have an account?{" "}
    <Link onClick={() => navigate("/signup")}>Sign up</Link>
  </div>
</form>
```

### In Verification Flow:

```javascript
<div>
  <OtpInput value={code} onChange={setCode} />

  <div style={{ textAlign: "center", marginTop: "16px" }}>
    <Link onClick={handleResendCode} disabled={timeLeft > 0}>
      {timeLeft > 0 ? `Resend in ${timeLeft}s` : "Resend code"}
    </Link>
  </div>

  <div style={{ textAlign: "center", marginTop: "24px" }}>
    <Link variant="muted" onClick={() => navigate("/login")}>
      ← Back to login
    </Link>
  </div>
</div>
```

## 📝 Notes

- Automatically prevents default behavior when onClick is provided
- Works with React Router or any navigation library
- Supports both mouse and keyboard interactions
- Maintains focus states for accessibility compliance
- Consistent with other UI components in the design system
