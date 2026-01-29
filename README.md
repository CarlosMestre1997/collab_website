# Website Collab - 3D Carousel Gallery

An interactive 3D carousel website built with React, Three.js, and WebGPU.

## Features

- **3D Carousel Navigation**: Smooth, interactive 3D carousel with drag, scroll, and touch support
- **Expandable Sections**: Click on any section title to view full-page details
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern Tech Stack**: Built with React 19, Three.js, and Vite

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
Website_Collab/
├── App.tsx              # Main application component
├── carousel-3d.tsx      # 3D carousel component
├── main.tsx            # React entry point
├── index.html          # HTML template
├── styles.css          # Global styles
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies
```

## Technologies

- **React 19** - UI framework
- **Three.js** - 3D graphics
- **@react-three/fiber** - React renderer for Three.js
- **TypeScript** - Type safety
- **Vite** - Fast build tool

## Deployment

### Deploy to Vercel

1. **Push your code to GitHub** (already done):
   ```bash
   git push origin main
   ```

2. **Import to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings

3. **Build Settings** (auto-configured):
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. Click **Deploy** and you're live! 🚀

### Manual Build (Local Testing)

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

The build output will be in the `dist/` directory.

## License

MIT
