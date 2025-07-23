# Profile and Post Variations Documentation

This document describes all available profile types and post variations with their complete prop configurations.

## Profile Types

### 1. Public Profile - Not Following
- **User State**: Can view all content
- **Follow Status**: "follow"
- **Privacy**: `isPrivate: false`
- **Actions**: Follow, Message, Report, Block, Share

### 2. Public Profile - Following
- **User State**: Can view all content
- **Follow Status**: "following"
- **Privacy**: `isPrivate: false`
- **Actions**: Unfollow, Message, Report, Block, Share

### 3. Private Profile - Request Sent
- **User State**: Limited content visibility
- **Follow Status**: "requested"
- **Privacy**: `isPrivate: true`
- **Actions**: Cancel Request, Report, Block, Share
- **Content**: Shows PrivateProfile component

### 4. Private Profile - Not Following
- **User State**: Limited content visibility
- **Follow Status**: "follow"
- **Privacy**: `isPrivate: true`
- **Actions**: Send Request, Report, Block, Share
- **Content**: Shows PrivateProfile component

### 5. Business Card Profile
- **User Type**: Company/Organization
- **Features**: Company branding, job postings, business information
- **Content**: Company posts, job listings, company information
- **Actions**: Follow company, contact, share

### 6. Partner Profile
- **User Type**: Official partners (educational platforms, etc.)
- **Features**: Special partner badge, educational content
- **Content**: Partner-specific posts, courses, resources
- **Actions**: Follow partner, contact, share

## Profile Props

```javascript
const Profile = ({
  user,                     // User data object
  userStats,               // Posts, followers, following counts
  activeTab,               // Current active tab ("posts", "certificates", "work")
  content,                 // Tab content data
  initialIsFollowing,      // Boolean - initial follow state
  initialFollowStatus,     // "follow" | "following" | "requested"
  isPrivate,              // Boolean - profile privacy
  onFollow,               // Follow action callback
  onMessage,              // Message action callback
  onTabChange,            // Tab change callback
  onBack,                 // Back button callback
  onShare,                // Share profile callback
  onReport,               // Report user callback
  onBlock,                // Block user callback
  mutualFriends,          // Array of mutual friends
  totalFollowers,         // Total followers count
  className               // Additional CSS classes
}) => { ... }
```

## Post Variations

### 1. Simple Text Post
- **Content**: Text only
- **Tags**: Hashtags
- **Images**: None
- **Engagement**: Basic likes, comments, shares

### 2. Post with Single Image
- **Content**: Text + single image
- **Tags**: Relevant hashtags
- **Images**: One image
- **Engagement**: Enhanced engagement with image

### 3. Post with Multiple Images
- **Content**: Text + multiple images (gallery)
- **Tags**: Relevant hashtags
- **Images**: Multiple images (carousel)
- **Engagement**: High engagement with visual content

### 4. Job Posting
- **Content**: Job description with details
- **Tags**: Job-related hashtags
- **Images**: Company/job banner
- **Engagement**: High shares, professional comments
- **User**: Company account

### 5. Educational Post
- **Content**: Educational content with tips/tutorials
- **Tags**: Educational hashtags
- **Images**: Infographics or diagrams
- **Engagement**: High saves and shares
- **User**: Educator/expert

### 6. Achievement Post
- **Content**: Personal achievements, certifications
- **Tags**: Achievement-related hashtags
- **Images**: Certificates or achievement images
- **Engagement**: Congratulatory comments
- **User**: Individual professional

### 7. Tagged Post
- **Content**: Post mentioning other users
- **Tags**: Social hashtags
- **Images**: Group photos
- **Engagement**: Comments from tagged users
- **User**: Individual with tagline showing tagged users

### 8. Viral Post
- **Content**: Controversial or highly engaging content
- **Tags**: Trending hashtags
- **Images**: Optional
- **Engagement**: Very high engagement numbers
- **User**: Influencer or thought leader

## Post Props

```javascript
const Post = ({
  user,                    // User data object
  content,                 // Post content text
  tags,                    // Array of hashtags
  images,                  // Array of image URLs
  stats,                   // Likes, comments, shares counts
  initialIsLiked,          // Boolean - initial like state
  initialHasCommented,     // Boolean - initial comment state
  initialHasShared,        // Boolean - initial share state
  likesData,              // Array of users who liked
  commentsData,           // Array of comment objects
  onLike,                 // Like action callback
  onComment,              // Comment action callback
  onShare,                // Share action callback
  onFollow,               // Follow user callback
  onUserClick,            // User click callback
  className               // Additional CSS classes
}) => { ... }
```

## User Data Structure

### Post User Object
```javascript
{
  avatar: "/path/to/avatar.png",
  companyName: "Display Name",
  tagline: "Professional title or tagged users",
  date: "Time ago string",
  isFollowing: boolean,
  taggedUsers: [           // Optional, for tagged posts
    { id: 1, name: "User Name" }
  ]
}
```

### Profile User Object
```javascript
{
  id: number,
  name: "Full Name",
  profession: "Job Title",
  location: "City, State",
  avatar: "/path/to/avatar.png",
  backgroundImage: "/path/to/background.jpg",
  isVerified: boolean,
  bio: "Bio text",
  company: "Company Name",
  education: "Education details",
  website: "https://website.com"
}
```

## Engagement Levels

### Low Engagement (0-100)
- New users or niche content
- Limited reach
- Basic interactions

### Medium Engagement (100-1000)
- Established users
- Regular content
- Good community interaction

### High Engagement (1000+)
- Viral content
- Influencers
- Trending topics

## Usage Examples

### Creating a Public Profile
```javascript
<Profile
  user={userData}
  userStats={statsData}
  content={contentData}
  initialIsFollowing={false}
  initialFollowStatus="follow"
  isPrivate={false}
  onFollow={handleFollow}
  onMessage={handleMessage}
  onBack={handleBack}
  // ... other props
/>
```

### Creating a Job Post
```javascript
<Post
  user={companyUser}
  content={jobDescription}
  tags={jobTags}
  images={[jobBanner]}
  stats={jobStats}
  onLike={handleLike}
  onComment={handleComment}
  onShare={handleShare}
  onUserClick={handleUserClick}
  // ... other props
/>
```

## Testing

Run the examples page to see all variations in action:

1. Navigate to `/examples` route
2. Use the dropdown to select different examples
3. Interact with components to test functionality
4. Check console for callback logs

## Notes

- All examples include realistic mock data
- Callbacks log actions to console for testing
- Examples demonstrate proper prop usage
- Components are fully interactive
- Responsive design included