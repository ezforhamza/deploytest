# User Onboarding Modal

A unified modal component that handles both privacy settings and certificate uploads for different user types.

## Usage

```jsx
import { UserOnboardingModal } from './features/onboarding';

// For Alumni (Privacy → Certificates flow)
<UserOnboardingModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onComplete={(result) => {
    console.log('Onboarding completed:', result);
    // result contains: { privacySettings, certificates, userType, completedSteps }
  }}
  userType="alumni"
/>

// For School/Company (Privacy only flow)
<UserOnboardingModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  onComplete={(result) => {
    console.log('Privacy settings saved:', result);
    // result contains: { privacySettings, userType, completedSteps }
  }}
  userType="school" // or "company"
/>
```

## Props

- `isOpen`: boolean - Controls modal visibility
- `onClose`: function - Called when modal is closed
- `onComplete`: function - Called when the entire flow is completed
- `userType`: 'alumni' | 'school' | 'company' - Determines the flow type
- `initialStep`: 'privacy' | 'certificates' - Optional starting step (default: 'privacy')

## Flow Logic

### Alumni Flow
1. **Privacy Settings** → Next button → **Certificates** → Save button → Complete
2. User can go back from certificates to privacy settings

### School/Company Flow
1. **Privacy Settings** → Save button → Complete
2. No certificate step for these user types

## Features

- **Responsive design** with separate mobile and desktop layouts
- **Business card preview** functionality
- **Dynamic settings** based on user type
- **Step navigation** with progress indication for alumni
- **Reusable privacy settings** across all user types
- **Certificate management** for alumni only