# MVP Sonify

A web-based audio application that creates musical soundscapes based on location, time, and seasonal data.

## Overview

MVP Sonify is a React + TypeScript + Vite application that generates procedural music using Web Audio API and Tone.js. The application creates immersive audio experiences that adapt to seasonal changes and user preferences.

## Features Implemented

### Step 0: Foundation ✅
- **Vite + React + TypeScript** project setup
- **Cross-Origin Isolation** headers configured for dev/preview/production
  - `Cross-Origin-Opener-Policy: same-origin`
  - `Cross-Origin-Embedder-Policy: require-corp`
- **Production deployment configs**:
  - `vercel.json` - Vercel deployment with security headers
  - `netlify.toml` - Netlify deployment with security headers
- **UI Foundation**:
  - Full-viewport responsive layout
  - "Tap to Start Audio" button
  - Location input field
  - Year selector (2018-2026)
  - Season selector
  - Reverb quality toggle (Eco/Studio)

### Step 1: Audio Infrastructure ✅
- **Audio Graph System** (`src/audio/graph.ts`):
  - Master compressor/limiter chain
  - Convolver reverb with impulse response loading
  - Send bus architecture for effects routing
  - Clean disposal and resource management
- **Audio Context Management**:
  - `startAudio()` function with proper Tone.js initialization
  - Impulse response file loading (`/irs/medium-room.wav`)
  - Button-triggered audio context activation

### Step 2: Musical Framework ✅
- **Scale System** (`src/audio/scales.ts`):
  - Five musical modes: Ionian, Dorian, Lydian, Mixolydian, Aeolian
  - Scale degree to MIDI conversion
  - MIDI note quantization to scale
  - TypeScript types for musical structures
- **Seasonal Scale Mapping** (`src/audio/seasonMode.ts`):
  - Automatic seasonal scale selection:
    - Winter → D Dorian (MIDI 50)
    - Spring → G Lydian (MIDI 55)
    - Summer → C Ionian (MIDI 48)
    - Autumn → A Aeolian (MIDI 57)
  - Date-based season detection
  - Manual scale override system
- **Enhanced UI**:
  - Toggle between "Follow seasons" and "Fixed mode"
  - Mode and root note selectors for fixed mode
  - Live display of current active scale

## Technical Architecture

### Audio Stack
- **Tone.js** - Web Audio API abstraction and audio graph management
- **Master Chain**: Input → Send Bus → Convolver → Master Compressor → Output
- **Cross-Origin Isolation** - Required for advanced audio processing

### Scale System
- **Modal harmony** based on traditional Western modes
- **MIDI-based** note representation (0-127)
- **Seasonal mapping** with fallback to manual selection
- **Real-time** scale switching without audio interruption

### State Management
- **React hooks** for UI state
- **Module-level state** for audio and scale systems
- **Clean separation** between UI, audio, and musical logic

## Development

### Prerequisites
- Node.js 18+
- Modern browser with Web Audio API support

### Setup
```bash
npm install
npm run dev     # Development server with hot reload
npm run build   # Production build
npm run preview # Preview production build
```

### Project Structure
```
src/
├── audio/
│   ├── graph.ts        # Audio graph management
│   ├── scales.ts       # Musical scale definitions
│   └── seasonMode.ts   # Seasonal scale mapping
├── App.tsx             # Main UI component
├── main.tsx            # App entry point with audio init
└── index.css           # Minimal styling

public/
└── irs/
    └── medium-room.wav # Impulse response for reverb
```

## Security & Performance

- **Cross-Origin Isolation** enabled for advanced audio features
- **No PWA/Service Worker** - Pure web application
- **Minimal dependencies** - Focus on core audio functionality
- **TypeScript** for type safety and developer experience

## Deployment

The application is configured for deployment on:
- **Vercel** (via `vercel.json`)
- **Netlify** (via `netlify.toml`)

Both configurations include the required COOP/COEP headers for audio processing.

## Next Steps

- Step 3: Instrument implementation and sound generation
- Step 4: Location-based audio processing
- Step 5: Visual representation and UI polish

## Contributing

This is an MVP project following a careful step-by-step development approach. Each step builds incrementally on the previous foundation while maintaining a clean, testable codebase.
