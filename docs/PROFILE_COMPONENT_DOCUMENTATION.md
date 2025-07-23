# Profile Component Documentation

## Overview
The Profile component is a comprehensive React component that displays user profiles with features including user information, follow/unfollow functionality, messaging, tabbed content, and privacy controls. It supports both public and private profiles with appropriate access controls.

## Component Structure

### Main File: `src/components/profile/Profile.jsx`

## Component Tree
```
Profile
├── ProfileHeader
├── ProfileUserInfo
├── ProfileActions
├── ProfileTabs
├── ProfileContent
├── PrivateProfile
├── ReportModal
└── BlockModal
```

## Props

### Required Props
- `user`: Object containing user information
- `userStats`: Object containing user statistics (followers, following, posts)

### Optional Props
- `activeTab`: String indicating active tab (default: `"posts"`)
- `content`: Object containing tab content (default: `{}`)
- `initialIsFollowing`: Boolean indicating if user is initially followed (default: `false`)
- `initialFollowStatus`: String indicating follow status - "follow", "following", "requested" (default: `"follow"`)
- `isPrivate`: Boolean indicating if profile is private (default: `false`)
- `mutualFriends`: Array of mutual friends data
- `totalFollowers`: Number of total followers
- `className`: String for additional CSS classes (default: `""`)

### Callback Props
- `onFollow`: Function called when follow action is performed
- `onMessage`: Function called when message action is triggered
- `onTabChange`: Function called when tab is changed
- `onBack`: Function called when back button is pressed
- `onShare`: Function called when share action is triggered
- `onReport`: Function called when report action is performed
- `onBlock`: Function called when block action is performed

## State Management

### User Interaction States
- `isFollowing`: Boolean - Current follow status
- `followStatus`: String - Current follow status ("follow", "following", "requested")
- `currentActiveTab`: String - Currently active tab

### Loading States
- `isFollowLoading`: Boolean - Loading state for follow action
- `isMessageLoading`: Boolean - Loading state for message action

### Modal States
- `isReportModalOpen`: Boolean - Controls report modal visibility
- `isBlockModalOpen`: Boolean - Controls block modal visibility

## Key Features

### 1. Follow System
Supports three follow states:
- **"follow"**: User is not followed
- **"following"**: User is followed
- **"requested"**: Follow request sent (for private profiles)

### 2. Privacy Controls
- Private profile support
- Content hiding for non-followers
- Follow request system

### 3. Interactive Elements
- **Follow/Unfollow**: Toggle follow status with optimistic updates
- **Message**: Direct messaging functionality
- **Tab Navigation**: Switch between posts, certificates, work history
- **Profile Actions**: Report and block functionality

### 4. Modal Management
- Report Modal: Report inappropriate users
- Block Modal: Block users with confirmation

## API Integration

### Follow Handler (`handleFollow`)
```javascript
const handleFollow = async () => {
  // Prevent double-clicks
  if (isFollowLoading) return;
  
  // Optimistic update based on current status
  if (followStatus === "follow") {
    const newStatus = isPrivate ? "requested" : "following";
    setFollowStatus(newStatus);
    setIsFollowing(newStatus === "following");
  } else {
    setFollowStatus("follow");
    setIsFollowing(false);
  }
  
  // API call with rollback on error
  try {
    if (onFollow) await onFollow(followStatus);
  } catch (error) {
    // Rollback state on error
  }
};
```

### Message Handler (`handleMessage`)
```javascript
const handleMessage = async () => {
  if (isMessageLoading) return;
  
  try {
    if (onMessage) await onMessage();
  } catch (error) {
    console.error("Message failed:", error);
  }
};
```

## Sub-Components

### ProfileHeader (`src/components/profile/ProfileHeader.jsx`)
Navigation header with back button and options menu.

**Props:**
- `onBack`: Callback for back navigation
- `onShare`: Callback for share action
- `onReport`: Callback for report action
- `onBlock`: Callback for block action

**Features:**
- Back navigation button
- "Profile" title
- More options menu (share, report, block)
- Custom SVG back icon

### ProfileUserInfo (`src/components/profile/ProfileUserInfo.jsx`)
Displays user information including avatar, name, location, and business details.

**Props:**
- `user`: User object with avatar, name, location, partner info, business card

**Features:**
- Circular user avatar with fallback
- User name display
- Location with icon
- Partner/company information (clickable)
- Business card link (clickable)
- Partner Modal integration
- Business Card Preview integration

**State:**
- `isBusinessCardOpen`: Boolean - Controls business card modal
- `isPartnerModalOpen`: Boolean - Controls partner modal

**Interactive Elements:**
- Partner info click opens PartnerModal
- Business card click opens BusinessCardPreview
- Error handling for avatar loading

## Usage Examples

### Basic Usage
```javascript
import Profile from './components/profile/Profile';

const userData = {
  user: {
    avatar: "/path/to/avatar.jpg",
    name: "John Doe",
    location: "New York, NY",
    partnerInfo: {
      text: "Partner at Tech Corp"
    },
    businessCardLink: {
      text: "View Business card"
    }
  },
  userStats: {
    followers: 1234,
    following: 567,
    posts: 89
  }
};

<Profile
  user={userData.user}
  userStats={userData.userStats}
  onFollow={handleFollow}
  onMessage={handleMessage}
  onBack={handleBack}
/>
```

### Private Profile
```javascript
<Profile
  user={userData.user}
  userStats={userData.userStats}
  isPrivate={true}
  initialFollowStatus="follow"
  onFollow={handleFollow}
  onMessage={handleMessage}
/>
```

### With Content and Tabs
```javascript
<Profile
  user={userData.user}
  userStats={userData.userStats}
  activeTab="posts"
  content={{
    posts: postsArray,
    certificates: certificatesArray,
    workHistory: workHistoryArray
  }}
  onTabChange={handleTabChange}
/>
```

## Styling

### CSS Classes
- Uses Tailwind CSS for styling
- Font family: Lexend
- Responsive design with max-width constraints
- Color scheme from design tokens

### Key Styling Features
- Centered layout with max-width
- Consistent spacing and typography
- Hover effects on interactive elements
- Loading states visual feedback
- Modal backdrop and animations

## Privacy System

### Private Profile Logic
```javascript
{isPrivate && followStatus !== "following" ? (
  <PrivateProfile />
) : (
  <>
    <ProfileTabs />
    <ProfileContent />
  </>
)}
```

### Follow Status States
1. **Public Profile**:
   - "follow" → "following" (immediate)
   
2. **Private Profile**:
   - "follow" → "requested" (pending approval)
   - "requested" → "follow" (cancel request)
   - "following" → "follow" (unfollow)

## Modal Components

### ReportModal
- Purpose: Report inappropriate user behavior
- Props: `isOpen`, `onClose`, `onReport`, `type="user"`
- Features: Reason selection, submission handling

### BlockModal
- Purpose: Block user with confirmation
- Props: `isOpen`, `onClose`, `onBlock`, `user`
- Features: Confirmation dialog, user context

## Accessibility Features

- Proper ARIA labels
- Keyboard navigation support
- Focus management for modals
- Screen reader friendly content
- Semantic HTML structure

## Performance Considerations

- Optimistic updates for better UX
- Lazy loading for modal content
- Conditional rendering for private profiles
- Efficient state management

## Error Handling

1. **Follow Errors**: Rollback to previous state
2. **Message Errors**: Console logging
3. **Avatar Loading**: Fallback image
4. **Modal Errors**: Proper cleanup

## Dependencies

- React hooks (useState)
- Design tokens from styles/tokens
- Sub-component imports
- Modal components
- Business card and partner components

## Testing Considerations

- Mock API callbacks for testing
- Test follow state transitions
- Test private profile access
- Test modal interactions
- Test error scenarios
- Test loading states

## Integration Points

### External Components
- `BusinessCardPreview`: Business card modal
- `PartnerModal`: Partner information modal
- `MoreOptionsMenu`: Reusable options menu

### API Endpoints
- Follow/unfollow user
- Send message
- Report user
- Block user
- Fetch user profile data

## Future Enhancements

- Real-time follow status updates
- Push notifications for follow requests
- Advanced profile customization
- Enhanced privacy controls
- Profile verification system
- Activity feed integration
- Advanced search and filtering