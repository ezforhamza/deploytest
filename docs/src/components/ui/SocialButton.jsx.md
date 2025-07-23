# Social Button Component

**File Path:** `src/components/ui/SocialButton.jsx`

## 📋 Purpose

Clean, minimal social login buttons for Apple and Google. Features grey background with branded icons, customizable sizes, and hover effects matching the Figma design.

## 🚀 How to Use

### Import:

```javascript
import SocialButton from "./components/ui/SocialButton";
```

### Basic Usage:

```javascript
<SocialButton type="apple" onClick={handleAppleLogin} />
<SocialButton type="google" onClick={handleGoogleLogin} />
```

### Different Sizes:

```javascript
<SocialButton type="apple" size="small" />
<SocialButton type="google" size="default" />
<SocialButton type="apple" size="large" />
```

### With Event Handlers:

```javascript
<SocialButton
  type="google"
  onClick={() => console.log("Google login")}
  disabled={isLoading}
/>
```

## 🎨 Available Props

| Prop        | Type                            | Default   | Description            |
| ----------- | ------------------------------- | --------- | ---------------------- |
| `type`      | 'apple' \| 'google'             | 'google'  | Social platform type   |
| `size`      | 'small' \| 'default' \| 'large' | 'default' | Button size            |
| `onClick`   | function                        | -         | Click handler          |
| `disabled`  | boolean                         | false     | Disable button         |
| `className` | string                          | ''        | Additional CSS classes |

## 📏 Size Options

### Small:

```javascript
<SocialButton size="small" />
```

- **Dimensions**: 60×27px
- **Use case**: Compact layouts

### Default (Figma spec):

```javascript
<SocialButton size="default" />
```

- **Dimensions**: 80×36px
- **Use case**: Standard forms

### Large:

```javascript
<SocialButton size="large" />
```

- **Dimensions**: 100×45px
- **Use case**: Prominent placement

## 🔧 Common Usage

### In Login Form:

```javascript
<div className="flex space-x-4">
  <SocialButton type="apple" onClick={handleAppleLogin} />
  <SocialButton type="google" onClick={handleGoogleLogin} />
</div>
```

### With Loading State:

```javascript
<SocialButton type="google" onClick={handleGoogleLogin} disabled={isLoading} />
```

## 🎨 Design Features

- **Grey background**: #F5F5F5 matching Figma
- **Rounded corners**: 8px border radius
- **Hover effect**: Darker grey on hover
- **Centered icons**: Perfect alignment
- **Authentic branding**: Official Apple and Google icons

## 📝 Notes

- Icons are embedded SVGs for sharp rendering
- Hover effects only work when not disabled
- Maintains aspect ratio across all sizes
- Ready for authentication integration
