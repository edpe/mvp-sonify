import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import * as Tone from "tone";
import { initGraph } from "./audio/graph.ts";
import { startIntentScheduler } from "./intents/dispatcher.ts";

export async function startAudio(): Promise<void> {
  // Start Tone.js audio context
  await Tone.start();

  // Initialize the audio graph with IR
  await initGraph({ irUrl: "/irs/medium-room.wav" });

  // Start the intent scheduler after audio is ready
  startIntentScheduler();
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
