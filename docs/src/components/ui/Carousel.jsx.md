# Carousel Component (Final Version)

**File Path:** `src/components/ui/Carousel.jsx`

## 📋 Purpose

A clean, minimal carousel component for boarding pages. Displays images with smooth transitions, overlaid dot navigation, auto-play functionality, and mobile swipe support. Features a fixed 643×741 size with rounded corners and no background.

## 🚀 How to Use

### Setup Images in Public Folder:

```
public/
├── crousal/
│   ├── onboarding-slide-1.png
│   ├── onboarding-slide-2.png
│   └── onboarding-slide-3.png
```

### Import and Use:

```javascript
import Carousel from "./components/ui/Carousel";

const BoardingPage = () => {
  const carouselImages = [
    "/crousal/onboarding-slide-1.png",
    "/crousal/onboarding-slide-2.png",
    "/crousal/onboarding-slide-3.png",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Carousel
        images={carouselImages}
        autoPlay={true}
        autoPlayInterval={4000}
      />
    </div>
  );
};
```

### With Slide Change Handler:

```javascript
<Carousel
  images={carouselImages}
  onSlideChange={(slideIndex) => {
    console.log("Current slide:", slideIndex);
  }}
/>
```

### Disable Auto-play:

```javascript
<Carousel images={carouselImages} autoPlay={false} />
```

## 🎨 Available Props

| Prop               | Type     | Default | Description                        |
| ------------------ | -------- | ------- | ---------------------------------- |
| `images`           | array    | []      | Array of image URLs/paths          |
| `autoPlay`         | boolean  | true    | Enable auto-play functionality     |
| `autoPlayInterval` | number   | 4000    | Auto-play interval in milliseconds |
| `className`        | string   | ''      | Additional CSS classes             |
| `onSlideChange`    | function | -       | Callback when slide changes        |

## ✨ Key Features

### Fixed Dimensions & Clean Design:

- **643×741px container** - exact Figma specifications
- **Rounded corners** - 2xl border radius for modern look
- **No background** - just pure image display
- **Responsive** - scales on smaller screens with `maxWidth: 100%`

### Overlaid Dot Navigation:

- **Bottom overlay** - positioned at `bottom-2` (8px from bottom)
- **Active dot**: 40px×8px pill shape (white)
- **Inactive dots**: 8px×8px circles (50% opacity white)
- **Smooth transitions** - 300ms duration
- **Hover effects** - inactive dots brighten on hover

### Smart Auto-Play:

- **Automatic progression** - cycles through slides
- **Pause on interaction** - stops when user clicks dots
- **Auto-resume** - restarts after 3 seconds
- **Customizable timing** - set your own interval

### Touch Support:

- **Swipe left** - next slide
- **Swipe right** - previous slide
- **50px minimum distance** - prevents accidental swipes
- **Mobile optimized** - works perfectly on touch devices

## 🔧 Technical Implementation

### Fixed Width Image Strategy:

```javascript
// Each slide has fixed 643px width
<div style={{ width: "643px", maxWidth: "100%" }}>
  <img className="w-full h-full object-cover" />
</div>
```

### Smooth Transitions:

```javascript
// Container translates by 100% per slide
transform: `translateX(-${currentSlide * 100}%)`;
```

### Dot Navigation Styling:

```javascript
// Active dot (pill shape)
className = "w-10 h-2 bg-white";

// Inactive dot (small circle)
className = "w-2 h-2 bg-white bg-opacity-50";
```

## 📱 Responsive Behavior

### Desktop (≥643px width):

- **Full size**: 643×741px container
- **Fixed dimensions**: Images maintain aspect ratio
- **Centered**: Use flexbox to center in parent

### Mobile (<643px width):

- **Scaled container**: `maxWidth: 100%` scales entire component
- **Proportional scaling**: Maintains 643:741 aspect ratio
- **Touch optimized**: Swipe gestures work perfectly

## 🎯 Image Preparation

### Recommended Specifications:

- **Dimensions**: 643×741px or higher resolution
- **Format**: PNG or JPG
- **Optimization**: Compress for web (aim for <500KB per image)
- **Aspect ratio**: 643:741 (0.867:1) for best fit

### File Naming Convention:

```
onboarding-slide-1.png
onboarding-slide-2.png
onboarding-slide-3.png
```

## 🔧 Usage Examples

### In Login Page:

```javascript
const LoginPage = () => {
  const slides = [
    "/crousal/onboarding-slide-1.png",
    "/crousal/onboarding-slide-2.png",
    "/crousal/onboarding-slide-3.png",
  ];

  return (
    <div className="flex">
      {/* Left side - Carousel */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
        <Carousel images={slides} />
      </div>

      {/* Right side - Form */}
      <div className="w-full lg:w-1/2">{/* Login form content */}</div>
    </div>
  );
};
```

### Centered on Full Page:

```javascript
const OnboardingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Carousel images={carouselImages} autoPlayInterval={5000} />
    </div>
  );
};
```

### With Progress Tracking:

```javascript
const [currentSlide, setCurrentSlide] = useState(0);
const totalSlides = slides.length;

<div className="flex flex-col items-center">
  <Carousel images={slides} onSlideChange={setCurrentSlide} />

  <div className="mt-4 text-gray-600">
    Slide {currentSlide + 1} of {totalSlides}
  </div>
</div>;
```

## 🎨 Styling Details

### Container Styles:

- **Position**: `relative` for dot overlay
- **Overflow**: `hidden` for clean image cropping
- **Border radius**: `rounded-2xl` (16px)
- **Dimensions**: Fixed 643×741px with responsive scaling

### Dot Navigation:

- **Position**: `absolute bottom-2 left-1/2`
- **Transform**: `translate-x-1/2` for perfect centering
- **Spacing**: `space-x-2` (8px gap between dots)
- **Active**: 40×8px white pill
- **Inactive**: 8×8px semi-transparent white circles

### Transitions:

- **Slide transition**: 500ms ease-in-out
- **Dot transition**: 300ms for smooth state changes
- **Hardware accelerated**: Uses `transform` for performance

## 📝 Performance Features

- **Lazy loading** - first image loads immediately, others are lazy
- **Memory efficient** - proper cleanup of intervals
- **Hardware acceleration** - CSS transforms for smooth animation
- **Touch optimized** - prevents conflicts with page scrolling

## 🔧 Accessibility

- **ARIA labels** - each dot has descriptive label
- **Keyboard support** - dots are focusable buttons
- **Alt text** - images have meaningful alt attributes
- **Focus management** - proper outline handling

## 📝 Best Practices

### Implementation:

```javascript
// Always provide alt-text context
const slides = [
  { src: "/slide1.png", alt: "Connect with Alumni" },
  { src: "/slide2.png", alt: "Build Relationships" },
  { src: "/slide3.png", alt: "Network and Grow" },
];
```

### Performance:

- Keep slide count to 3-5 for optimal user experience
- Optimize images before adding to public folder
- Consider using WebP format for better compression

### Usage Guidelines:

- Center carousel in its container for best visual impact
- Test auto-play timing with real content
- Ensure sufficient contrast for dot navigation visibility
- Test swipe gestures on actual mobile devices

## 📝 Notes

- **No background styling** - component is purely for image display
- **Fixed dimensions** - maintains consistent size across applications
- **Minimal dependencies** - only uses React hooks, no external libraries
- **Production ready** - handles edge cases and error states
- **Mobile first** - designed with touch interactions in mind
