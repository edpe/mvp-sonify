import type {
  DroneIntent,
  PatternIntent,
  PhraseIntent,
} from "../intents/intentTypes";

// Timer tracking for each stream
let droneTimer = 0;
let patternTimer = 0;
let phraseTimer = 0;

// Random utility functions
function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function generateDroneIntent(): DroneIntent {
  return {
    kind: "drone",
    whenSec: performance.now() / 1000 + 0.15, // 150ms lookahead
    chordIdx: Math.floor(Math.random() * 3), // 0, 1, or 2
    holdSec: randomBetween(4, 6),
  };
}

function generatePatternIntent(): PatternIntent {
  const density = Math.random(); // 0..1
  const subdivision = density > 0.5 ? "1/16" : "1/8"; // tie subdivision to density

  return {
    kind: "pattern",
    whenSec: performance.now() / 1000 + 0.15, // 150ms lookahead
    density,
    subdivision,
    mask: Math.floor(Math.random() * 65536), // 0..65535 (16-bit bitmask)
  };
}

function generatePhraseIntent(): PhraseIntent {
  const contourIds: ("riseFall" | "arch" | "meander")[] = [
    "riseFall",
    "arch",
    "meander",
  ];

  return {
    kind: "phrase",
    whenSec: performance.now() / 1000 + 0.15, // 150ms lookahead
    contourId: randomChoice(contourIds),
    loudness: randomBetween(0.4, 0.9),
  };
}

// Main scheduler loop
function tick() {
  const now = performance.now();

  // Drone: every 4-8 seconds
  if (now - droneTimer > randomBetween(4000, 8000)) {
    const intent = generateDroneIntent();
    postMessage(intent);
    droneTimer = now;
  }

  // Pattern: every 1-2 seconds
  if (now - patternTimer > randomBetween(1000, 2000)) {
    const intent = generatePatternIntent();
    postMessage(intent);
    patternTimer = now;
  }

  // Phrase: every 8-15 seconds
  if (now - phraseTimer > randomBetween(8000, 15000)) {
    const intent = generatePhraseIntent();
    postMessage(intent);
    phraseTimer = now;
  }
}

// Start the scheduler - tick every 100ms
setInterval(tick, 100);
