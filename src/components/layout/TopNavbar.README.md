# Dynamic TopNavbar Implementation

## 🎯 Overview
The TopNavbar now dynamically adapts based on the current navigation context and user role, providing contextual actions and icons.

## 🔄 Dynamic Behaviors

### **Alumni Role**
**Job Offers Section:**
- ✅ Shows **filter icon** (nav-filter.svg) to the left of message icon
- ✅ Create button remains "Create Post"

**Other Sections:**
- ✅ Standard navbar (no filter icon)
- ✅ Create button shows "Create Post"

### **Company Role**
**Job/Post Jobs Sections:**
- ✅ Create button changes to **"Create Job"**
- ✅ No filter icon shown

**Other Sections:**
- ✅ Standard navbar
- ✅ Create button shows "Create Post"

### **School Role**
**All Sections:**
- ✅ Standard navbar behavior
- ✅ Create button shows "Create Post"

## 📝 Props Added to TopNavbar

```javascript
// New dynamic props
activeNav = ""          // Current navigation item
userRole = ""           // Current user role
showFilterIcon = false  // Whether to show filter icon
createButtonText = "Create Post"  // Dynamic button text
onFilterClick = () => {}  // Filter click handler
```

## 🎛️ Configuration Logic

The Dashboard component now includes `getNavbarConfig()` which:

1. **Determines filter icon visibility:**
   ```javascript
   const showFilterIcon = userRole === "alumni" && activeNav === "Job Offers";
   ```

2. **Sets dynamic button text:**
   ```javascript
   if (userRole === "company" && (activeNav === "Jobs" || activeNav === "Post Jobs")) {
     createButtonText = "Create Job";
   }
   ```

## 🔌 Usage Example

```javascript
<TopNavbar
  // Standard props
  onSearchChange={handleSearchChange}
  onCreatePost={navbarConfig.createAction}
  onNotificationClick={handleNotificationClick}
  onMessageClick={handleMessageClick}
  onMenuClick={handleMenuClick}
  searchValue={searchValue}
  notificationCount={3}
  
  // Dynamic props
  onFilterClick={handleFilterClick}
  activeNav={activeNav}
  userRole={userRole}
  showFilterIcon={navbarConfig.showFilterIcon}
  createButtonText={navbarConfig.createButtonText}
/>
```

## 🎨 Visual Changes

**Alumni + Job Offers:**
```
[Menu] [Logo] [Search Bar] [Filter] [Notification] [Message] [Create Post]
```

**Company + Jobs:**
```
[Menu] [Logo] [Search Bar] [Notification] [Message] [Create Job]
```

**Default:**
```
[Menu] [Logo] [Search Bar] [Notification] [Message] [Create Post]
```

## 🔧 Future Enhancements

- Add different icons for different create actions
- Implement role-specific notification behaviors
- Add more contextual toolbar items
- Support for section-specific search behaviors