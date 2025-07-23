# Post Component Documentation

## Overview
The Post component is a comprehensive React component that displays social media posts with interactive features including likes, comments, shares, and reporting functionality. It's designed to be API-ready with optimistic updates and error handling.

## Component Structure

### Main File: `src/components/post/Post.jsx`

## Component Tree
```
Post
├── PostHeader
├── PostContent
├── PostStats
├── PostActions
├── CommentsModal
├── LikesModal
├── ShareModal
└── ReportModal
```

## Props

### Required Props
- `user`: Object containing user information
- `content`: String or object containing post content
- `stats`: Object containing post statistics (likes, comments, shares)

### Optional Props
- `tags`: Array of tag strings (default: `[]`)
- `images`: Array of image URLs (default: `[]`)
- `initialIsLiked`: Boolean indicating if post is initially liked (default: `false`)
- `initialHasCommented`: Boolean indicating if user has commented (default: `false`)
- `initialHasShared`: Boolean indicating if post has been shared (default: `false`)
- `likesData`: Array of user objects who liked the post (default: `[]`)
- `commentsData`: Array of comment objects (default: `[]`)
- `className`: String for additional CSS classes (default: `""`)

### Callback Props
- `onLike`: Function called when like action is performed
- `onComment`: Function called when comment is submitted
- `onShare`: Function called when share action is performed
- `onFollow`: Function called when follow action is triggered

## State Management

### User Interaction States
- `isLiked`: Boolean - Current like status
- `hasCommented`: Boolean - Whether user has commented
- `hasShared`: Boolean - Whether post has been shared

### UI States
- `showCommentField`: Boolean - Controls comment input visibility
- `commentText`: String - Current comment input value
- `showCommentsModal`: Boolean - Controls comments modal visibility
- `showLikesModal`: Boolean - Controls likes modal visibility
- `showShareModal`: Boolean - Controls share modal visibility
- `showReportModal`: Boolean - Controls report modal visibility

### Loading States
- `isLiking`: Boolean - Loading state for like action
- `isCommenting`: Boolean - Loading state for comment action
- `isSharing`: Boolean - Loading state for share action

### Data States
- `currentStats`: Object - Current post statistics
- `currentCommentsData`: Array - Current comments data

## Key Features

### 1. Optimistic Updates
All user interactions (like, comment, share) implement optimistic updates:
- UI updates immediately for better UX
- API calls happen in background
- Automatic rollback on error

### 2. Error Handling
- Try-catch blocks for all API calls
- State rollback on failures
- Console error logging
- Prevents double-clicks during loading

### 3. Interactive Elements
- **Like Button**: Toggle like status with optimistic updates
- **Comment System**: Inline comment field and modal-based comments
- **Share Functionality**: Modal-based sharing with multiple targets
- **Report Feature**: Modal-based reporting system

### 4. Modal Management
- Comments Modal: View and add comments
- Likes Modal: View users who liked the post
- Share Modal: Share post to different platforms
- Report Modal: Report inappropriate content

## API Integration

### Like Handler (`handleLike`)
```javascript
const handleLike = async () => {
  // Prevent double-clicks
  if (isLiking) return;
  
  // Optimistic update
  setIsLiked(!isLiked);
  setCurrentStats(prev => ({
    ...prev,
    likes: isLiked ? prev.likes - 1 : prev.likes + 1
  }));
  
  // API call with rollback on error
  try {
    if (onLike) await onLike(!isLiked);
  } catch (error) {
    // Rollback state on error
  }
};
```

### Comment Handler (`handleCommentSubmit`)
```javascript
const handleCommentSubmit = async () => {
  // Optimistic update
  setCurrentStats(prev => ({
    ...prev,
    comments: prev.comments + 1
  }));
  
  // API call with rollback on error
  try {
    if (onComment) await onComment(commentText);
  } catch (error) {
    // Rollback state on error
  }
};
```

### Share Handler (`handleShare`)
```javascript
const handleShare = async (shareTargets) => {
  // Optimistic update
  setHasShared(true);
  setCurrentStats(prev => ({
    ...prev,
    shares: prev.shares + 1
  }));
  
  // API call with rollback on error
  try {
    if (onShare) await onShare(shareTargets);
  } catch (error) {
    // Rollback state on error
  }
};
```

## Sub-Components

### PostHeader (`src/components/post/PostHeader.jsx`)
Displays user information and post options.

**Props:**
- `user`: User object with avatar, companyName, tagline, date, isFollowing
- `onFollow`: Callback for follow action
- `onReport`: Callback for report action
- `onSave`: Callback for save action

**Features:**
- User avatar and company name display
- Tagline formatting (breaks after 3 words)
- Follow button (only shown if not following)
- More options menu (save, report)

## Usage Examples

### Basic Usage
```javascript
import Post from './components/post/Post';

const postData = {
  user: {
    avatar: "/path/to/avatar.jpg",
    companyName: "Tech Corp",
    tagline: "Leading technology solutions provider",
    date: "2 hours ago",
    isFollowing: false
  },
  content: "This is a sample post content",
  stats: {
    likes: 42,
    comments: 12,
    shares: 8
  }
};

<Post
  user={postData.user}
  content={postData.content}
  stats={postData.stats}
  onLike={handleLike}
  onComment={handleComment}
  onShare={handleShare}
  onFollow={handleFollow}
/>
```

### With Comments and Likes Data
```javascript
<Post
  user={postData.user}
  content={postData.content}
  stats={postData.stats}
  likesData={likesArray}
  commentsData={commentsArray}
  initialIsLiked={true}
  initialHasCommented={false}
  onLike={handleLike}
  onComment={handleComment}
  onShare={handleShare}
/>
```

## Styling

### CSS Classes
- Uses Tailwind CSS for styling
- Font family: Lexend
- Responsive design with max-width constraints
- Color scheme from design tokens

### Key Styling Features
- Rounded corners and shadows
- Hover effects on interactive elements
- Loading states visual feedback
- Modal backdrop and animations

## Accessibility Features

- Proper ARIA labels
- Keyboard navigation support
- Focus management for modals
- Screen reader friendly content

## Performance Considerations

- Optimistic updates for better UX
- Debounced API calls
- Lazy loading for modal content
- Memoization opportunities for heavy computations

## Error Handling Best Practices

1. **Graceful Degradation**: UI works even if API calls fail
2. **User Feedback**: Clear error messages and loading states
3. **State Consistency**: Automatic rollback on errors
4. **Logging**: Console errors for debugging

## Dependencies

- React hooks (useState, useRef, useEffect)
- Design tokens from styles/tokens
- Sub-component imports
- Modal components

## Testing Considerations

- Mock API callbacks for testing
- Test optimistic updates and rollbacks
- Test modal interactions
- Test error scenarios
- Test loading states

## Future Enhancements

- Real-time updates
- Infinite scroll for comments
- Rich text editor for comments
- Image upload support
- Push notifications
- Advanced reporting options