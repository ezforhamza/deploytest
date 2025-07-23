# 3-Layer Architecture - Quick Reference

## 🚀 Quick Start

### **1. Create a Smart Content Component**
```javascript
// src/components/dashboard/content/jobs/AlumniJobBrowser.jsx
const AlumniJobBrowser = ({ 
  searchValue,
  setContentState,
  setContentData,
  contentData,
  navigateBack,
  canGoBack,
  userRole 
}) => {
  const handleJobClick = (job) => {
    setContentState('job_details', { job });
  };

  return (
    <div>
      {canGoBack && <button onClick={navigateBack}>← Back</button>}
      {/* Your component content */}
    </div>
  );
};
```

### **2. Register in Content Registry**
```javascript
// src/config/contentRegistry.js
import AlumniJobBrowser from '../components/dashboard/content/jobs/AlumniJobBrowser';

export const CONTENT_REGISTRY = {
  'Job Offers': {
    alumni: {
      [CONTENT_STATES.JOB_BROWSE]: AlumniJobBrowser, // 👈 Add here
    }
  }
};
```

### **3. That's it!** 
The system automatically:
- Loads your component when needed
- Provides enhanced props
- Manages state transitions
- Handles navigation history

---

## 🎛️ Content State Management

### **Navigate Between States**
```javascript
// Component A → Component B
setContentState('job_details', { job: selectedJob });

// Component B → Component C
setContentState('job_application', { job, applicationData });

// Go back to previous state
navigateBack();
```

### **Update Current Content Data**
```javascript
// Update data without changing state
setContentData({ 
  selectedJob: updatedJob,
  filters: newFilters 
});
```

### **Check Navigation Capability**
```javascript
// Conditionally show back button
{canGoBack && <button onClick={navigateBack}>← Back</button>}
```

---

## 📋 Available Content States

```javascript
// Job-related
CONTENT_STATES.JOB_BROWSE        // Browse jobs
CONTENT_STATES.JOB_DETAILS       // View job details
CONTENT_STATES.JOB_APPLICATION   // Apply to job
CONTENT_STATES.JOB_MANAGEMENT    // Manage jobs (company)
CONTENT_STATES.JOB_CREATE        // Create job (company)
CONTENT_STATES.JOB_ANALYTICS     // Job analytics (company)

// Profile-related
CONTENT_STATES.PROFILE_VIEW      // View profile
CONTENT_STATES.PROFILE_EDIT      // Edit profile
CONTENT_STATES.PROFILE_SETTINGS  // Profile settings

// Alumni-related
CONTENT_STATES.ALUMNI_NETWORK    // Alumni network
CONTENT_STATES.ALUMNI_DIRECTORY  // Alumni directory
CONTENT_STATES.ALUMNI_DETAILS    // Alumni details

// School-related
CONTENT_STATES.SCHOOL_BROWSE     // Browse schools
CONTENT_STATES.SCHOOL_DETAILS    // School details
CONTENT_STATES.SCHOOL_MANAGEMENT // Manage school
```

---

## 🎯 Common Patterns

### **Job Flow (Alumni)**
```
JOB_BROWSE → JOB_DETAILS → JOB_APPLICATION
```

### **Job Management (Company)**  
```
JOB_MANAGEMENT → JOB_CREATE
              → JOB_ANALYTICS
              → JOB_DETAILS
```

### **Alumni Network (School)**
```
ALUMNI_NETWORK → ALUMNI_DETAILS
```

---

## 🔧 Enhanced Props Reference

Every smart content component receives:

```javascript
{
  // Navigation context
  navigation: 'Job Offers',
  userRole: 'alumni',
  contentState: 'job_browse',
  contentData: { selectedJob: {...} },
  
  // State management functions
  setContentState: (state, data) => {},
  setContentData: (data) => {},
  
  // Navigation functions
  navigateBack: () => {},
  canGoBack: true,
  
  // Original props from Dashboard
  searchValue: 'developer',
  onProfileClick: () => {},
  // ... all other props
}
```

---

## 📝 Implementation Checklist

- [ ] Create component in `/src/components/dashboard/content/`
- [ ] Import component in `contentRegistry.js`
- [ ] Add component to appropriate navigation/role/state combination
- [ ] Test content state transitions
- [ ] Verify back navigation works
- [ ] Handle missing data gracefully
- [ ] Add loading states if needed

---

## 🐛 Common Issues & Solutions

### **Component not loading?**
- Check if component is imported in `contentRegistry.js`
- Verify navigation/role/state combination exists
- Check component export/import syntax

### **State transitions not working?**
- Ensure using `setContentState` not `setContentData`
- Verify target state exists in registry
- Check component is calling transition correctly

### **Back button not showing?**
- Check if `canGoBack` prop is true
- Verify previous state exists in history
- Make sure navigation was added to history

### **Props missing?**
- Smart components receive enhanced props automatically
- Original props are spread through `fallbackProps`
- Check if component is being loaded through SmartContentContainer

---

## 🎉 Ready to Build!

You now have everything you need to create powerful, dynamic content experiences! The 3-layer architecture handles all the complexity while you focus on building great user interfaces.

**Happy coding!** 🚀