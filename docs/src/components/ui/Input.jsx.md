# Input Component

**File Path:** `src/components/ui/Input.jsx`

## 📋 Purpose

A versatile input component with floating label design that handles all form input needs in the signin flow. Features floating labels that appear when focused or filled, built-in icons, password visibility toggle, validation states, and consistent styling matching the Figma designs.

## 🚀 How to Use

### Import:

```javascript
import Input from "./components/ui/Input";
```

### Basic Usage:

```javascript
<Input placeholder="Enter email" value={email} onChange={setEmail} />
```

### With Floating Labels (from Figma):

```javascript
<Input
  type="email"
  placeholder="Enter email"
  label="Email"
  icon="mail"
  value={email}
  onChange={setEmail}
/>

<Input
  type="password"
  placeholder="Enter password"
  label="Password"
  icon="lock"
  value={password}
  onChange={setPassword}
/>

<Input
  type="tel"
  placeholder="Enter Phone number"
  label="Phone"
  icon="phone"
  value={phone}
  onChange={setPhone}
/>
```

### With Validation:

```javascript
<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  icon="mail"
  value={email}
  onChange={setEmail}
  error={emailError}
  required
/>
```

## 🎨 Available Props

| Prop          | Type             | Default | Description                                        |
| ------------- | ---------------- | ------- | -------------------------------------------------- |
| `type`        | string           | 'text'  | Input type (text, email, password, tel, etc.)      |
| `placeholder` | string           | ''      | Placeholder text (shown when field is empty)       |
| `value`       | string           | ''      | Input value                                        |
| `onChange`    | function         | -       | Change handler function                            |
| `label`       | string           | ''      | Floating label text                                |
| `icon`        | string/ReactNode | null    | Icon ('mail', 'lock', 'phone' or custom component) |
| `error`       | string           | ''      | Error message                                      |
| `disabled`    | boolean          | false   | Disable input                                      |
| `required`    | boolean          | false   | Show required asterisk on floating label           |
| `className`   | string           | ''      | Additional CSS classes                             |

## 🎯 Built-in Icons

### Email Icon:

```javascript
<Input icon="mail" placeholder="Enter email" label="Email" />
<Input icon="email" placeholder="Enter email" label="Email" />
```

### Password Icon:

```javascript
<Input icon="lock" type="password" placeholder="Enter password" label="Password" />
<Input icon="password" type="password" placeholder="Enter password" label="Password" />
```

### Phone Icon:

```javascript
<Input icon="phone" type="tel" placeholder="Enter Phone number" label="Phone" />
```

### Custom Icon:

```javascript
<Input
  icon={<CustomIconComponent />}
  placeholder="Custom input"
  label="Custom Field"
/>
```

## ✨ Features

### Floating Label Design:

- **Default State**: Shows only placeholder text with full border
- **Active State**: When user focuses or types, label appears in top-left corner cutting through the border
- **Smooth Animation**: Label transitions smoothly between states
- **Smart Positioning**: Label adjusts position when icon is present

### Password Visibility Toggle:

- Automatically shown for `type="password"`
- Eye icon toggles between show/hide
- Positioned on the right side of the input

### Interactive States:

- **Focus**: Blue border and floating label appears
- **Filled**: Label stays in floating position when field has content
- **Error**: Red border and error message displayed below

### Icon Integration:

- Built-in common icons (mail, lock, phone)
- Support for custom icon components
- Proper spacing and alignment with floating labels

## 🔧 Common Use Cases

### Login Form:

```javascript
<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  icon="mail"
  value={email}
  onChange={setEmail}
  error={errors.email}
  required
/>

<Input
  label="Password"
  type="password"
  placeholder="Enter password"
  icon="lock"
  value={password}
  onChange={setPassword}
  error={errors.password}
  required
/>
```

### Forgot Password Form:

```javascript
<Input
  label="Email"
  placeholder="Enter Email"
  icon="mail"
  value={email}
  onChange={setEmail}
/>

<Input
  label="Phone"
  placeholder="Enter Phone number"
  icon="phone"
  value={phone}
  onChange={setPhone}
/>
```

### New Password Form:

```javascript
<Input
  label="New Password"
  placeholder="New password"
  type="password"
  icon="lock"
  value={newPassword}
  onChange={setNewPassword}
/>

<Input
  label="Confirm Password"
  placeholder="Confirm password"
  type="password"
  icon="lock"
  value={confirmPassword}
  onChange={setConfirmPassword}
/>
```

## 🎨 Floating Label Behavior

### Visual States:

1. **Empty & Unfocused**:

   - Only placeholder visible
   - Full border around input
   - Label hidden

2. **Focused or Filled**:
   - Label appears in top-left corner
   - Label cuts through the border (white background)
   - Placeholder text visible inside input
   - Smooth transition animation

### Label Positioning:

- **Without Icon**: Label positioned at 12px from left
- **With Icon**: Label positioned at 2.5rem from left (accounting for icon space)
- **Vertical**: Label positioned -8px from top to cut through border

## 🎨 Design System Integration

- Uses design system colors and typography
- Floating labels match Figma design exactly
- Consistent border radius and spacing
- Proper focus and error states
- Mobile-friendly touch targets (48px min height)

## 📱 Responsive Behavior

- Full width by default
- Touch-friendly on mobile devices
- Floating labels scale appropriately
- Icons and text maintain proper proportions

## 🔧 Technical Implementation

### Label Animation:

- Uses CSS transitions for smooth movement
- Z-index management for proper layering
- Background color to create "cut through border" effect

### State Management:

- Tracks focus state internally
- Shows floating label when `value || isFocused`
- Maintains accessibility with proper labeling

## 📝 Integration Notes

- Always provide both `label` and `placeholder` for best UX
- Label provides the floating text, placeholder shows inside the input
- Error states override normal border colors
- Password inputs automatically get visibility toggle
- Built-in SVG icons for better performance
- Fully accessible with proper focus management

## ⚠️ Important Usage Notes

- **Label vs Placeholder**:

  - `label` becomes the floating label
  - `placeholder` shows inside the input field
  - Both should be provided for optimal user experience

- **Icon Compatibility**: Floating labels automatically adjust positioning when icons are present

- **Required Fields**: Asterisk (\*) appears in the floating label when `required={true}`
