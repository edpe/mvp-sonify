import type { AnyIntent } from "./intentTypes";

let schedulerWorker: Worker | null = null;

export function startIntentScheduler(): void {
  if (schedulerWorker) {
    console.warn("Intent scheduler already running");
    return;
  }

  // Create and start the scheduler worker
  schedulerWorker = new Worker(
    new URL("../workers/scheduler.ts", import.meta.url),
    { type: "module" }
  );

  // Listen for intents from the worker
  schedulerWorker.onmessage = (event) => {
    const intent: AnyIntent = event.data;
    console.log("Intent received:", intent);
  };

  schedulerWorker.onerror = (error) => {
    console.error("Scheduler worker error:", error);
  };

  console.log("Intent scheduler started");
}

export function stopIntentScheduler(): void {
  if (schedulerWorker) {
    schedulerWorker.terminate();
    schedulerWorker = null;
    console.log("Intent scheduler stopped");
  }
}
