# Website Collab - 3D Interactive Gallery

A stunning interactive 3D gallery experience featuring a carousel homepage, radial image filters, ASCII art renderer, and comprehensive navigation modals. Built with React, Three.js, and modern web technologies.

![Demo](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-19.0.0-blue)
![Three.js](https://img.shields.io/badge/Three.js-0.180.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.0-blue)

## ✨ Features

### 🎠 3D Carousel Homepage
- **Interactive Navigation**: Smooth 3D carousel with drag, mouse wheel, and touch support
- **Auto-rotation**: Automatic carousel rotation with configurable speed
- **Snapping**: Sections snap into place for precise viewing
- **WebGPU Rendering**: High-performance 3D graphics with Three.js WebGPU backend
- **8 Gallery Sections**: Curated collection with unique titles and content

### 🎨 Advanced Image Effects
- **Radial Slider Control**: Interactive radial dial below each expanded image
- **Radical Color Filters**: 
  - Hue rotation (0-360°)
  - Dynamic saturation (1-4x)
  - Brightness boost (1-1.8x)
  - Enhanced contrast (1-2.5x)
  - Color inversion at high values
- **Dual Control Methods**: 
  - Drag the radial slider with mouse
  - Scroll with mouse wheel for precise adjustments
- **Real-time Performance**: GPU-accelerated filters with 50ms transitions

### 🖥️ ASCII Art Modal
- **3D ASCII Renderer**: Rotating torus knot rendered as ASCII characters
- **Interactive Controls**: OrbitControls for 360° viewing
- **Smooth Animations**: Damped camera movement and rotation
- **Modal Interface**: Click "Explore More" to launch fullscreen experience

### 📋 Navigation Modals

**Collections Modal**
- Grid layout showcasing 4 collection categories
- Hover animations with lift effects
- Digital Art, Photography, Abstract Works, 3D Renders

**About Modal**
- Gallery statistics (500+ artworks, 120+ artists, 25+ countries)
- Mission statement and background
- Gradient text effects and glassmorphism

**Contact Modal**
- Contact methods with icons (Email, Phone, Location)
- Social media links (Instagram, Twitter, Behance)
- Slide-in hover animations

### 🎯 Performance Optimizations
- **GPU Acceleration**: CSS transforms with hardware acceleration
- **Reduced Scroll Sensitivity**: 4x slower for precise control (0.0005 sensitivity)
- **Optimized Friction**: 0.94 friction coefficient for snappy feel
- **Fast Transitions**: 0.3s carousel, 0.05s filter transitions
- **Memoized Calculations**: React useMemo for filter computations

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173 or next available port)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
Website_Collab/
├── App.tsx                      # Main app with modals and section management
├── carousel-3d.tsx              # 3D carousel with WebGPU rendering
├── radial-slider-component.tsx  # Interactive radial slider with drag/wheel
├── ascii-renderer/
│   ├── ascii-renderer.tsx       # ASCII art 3D renderer component
│   ├── package.json            # Renderer dependencies
│   └── preview.tsx             # Standalone preview
├── main.tsx                     # React entry point
├── index.html                   # HTML template
├── styles.css                   # Global styles with GPU optimization
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── vercel.json                 # Vercel deployment config
└── package.json                # Project dependencies
```

## 🛠️ Technologies

### Core
- **React 19** - Latest React with improved performance
- **TypeScript 5.5** - Type-safe development
- **Vite 7.3** - Lightning-fast build tool and dev server

### 3D Graphics
- **Three.js 0.180** - WebGL/WebGPU 3D library
- **@react-three/fiber 9.5** - React renderer for Three.js
- **@react-three/drei 10.7** - Useful helpers (OrbitControls, effects)

### Animation & UI
- **Motion (Framer Motion) 12.29** - Advanced animation library
- **@number-flow/react 0.5** - Smooth number transitions

### Effects
- **AsciiEffect** - Three.js ASCII art renderer
- **CSS GPU Acceleration** - Hardware-accelerated transforms

## 🎮 Usage

### Navigation
- **Scroll/Drag**: Navigate through carousel sections
- **Click Title**: Expand section to full-page view
- **Close Button (X)**: Return to carousel homepage

### Image Effects
- **Drag Radial Slider**: Rotate the dial to adjust image effects
- **Mouse Wheel**: Scroll while hovering over slider for fine control
- **Effect Range**: 0 (normal) to 100 (maximum effects)

### Modals
- **Collections**: Click header link to view gallery categories
- **About**: Gallery information and statistics
- **Contact**: Contact methods and social links
- **ASCII Modal**: Click "Explore More" in any expanded section

### Controls Tips
- Carousel responds to wheel/drag with reduced sensitivity
- Radial slider snaps to nearest value on release
- ASCII renderer supports click-and-drag orbit controls

## 🎨 Customization

### Carousel Settings
```typescript
<ImageCarousel
  autorotateSpeed={0.015}    // Rotation speed
  friction={0.94}            // Drag friction
  wheelSensitivity={0.0005}  // Scroll sensitivity
  bendAmount={0.12}          // Carousel curve
  cornerRadius={0.12}        // Image corner radius
/>
```

### Filter Effects
```typescript
// Adjust filter intensity in App.tsx
const normalized = sliderValue / 100;
hue-rotate(${normalized * 360}deg)        // 0-360°
saturate(${1 + normalized * 3})           // 1-4x
brightness(${1 + normalized * 0.8})       // 1-1.8x
contrast(${1 + normalized * 1.5})         // 1-2.5x
invert(${(normalized - 0.7) * 3})         // at 70%+
```

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite settings

3. **Build Settings** (auto-configured):
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. Click **Deploy** 🚀

### Manual Build

```bash
# Production build
npm run build

# Output in dist/ directory
# Deploy dist/ to any static hosting (Netlify, Cloudflare Pages, etc.)
```

## 🐛 Troubleshooting

### Phantom TypeScript Errors
If you see errors for non-existent `carousel-3d` folder:
```bash
# Restart TypeScript server in VS Code
Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

### WebGL Context Errors
The project gracefully handles WebGL context issues. If you see warnings:
- Ensure browser supports WebGL2
- Try disabling browser extensions
- Check GPU drivers are up to date

### Performance Issues
- Reduce `autorotateSpeed` for slower animation
- Increase `friction` for less responsive drag
- Disable autorotate with `autorotate={false}`

## 📝 Development Notes

- **Image Sources**: Uses Supabase storage for demo images
- **Responsive**: Fully responsive with mobile breakpoints
- **Browser Support**: Modern browsers with WebGL2 support
- **TypeScript**: Strict mode enabled for type safety
- **Code Style**: ES6+ with functional React components

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Three.js community for excellent 3D library
- React Three Fiber for seamless React integration
- Supabase for demo image hosting
- Framer Motion for animation capabilities

---

**Built with ❤️ using React, Three.js, and TypeScript**

