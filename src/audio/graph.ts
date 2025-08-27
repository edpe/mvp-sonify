import * as Tone from "tone";

interface AudioGraph {
  master: Tone.Compressor;
  convolver: Tone.Convolver;
  sendBus: Tone.Gain;
}

let audioGraph: AudioGraph | null = null;

export async function initGraph({ irUrl }: { irUrl: string }): Promise<void> {
  // Dispose existing graph if any
  if (audioGraph) {
    disposeGraph();
  }

  // Create master compressor/limiter
  const master = new Tone.Compressor({
    threshold: -24,
    ratio: 12,
    attack: 0.003,
    release: 0.1,
  });

  // Create convolver for reverb
  const convolver = new Tone.Convolver();

  // Load impulse response
  await convolver.load(irUrl);

  // Create send bus gain node
  const sendBus = new Tone.Gain(0.3);

  // Connect the audio graph:
  // sendBus -> convolver -> master -> destination
  sendBus.connect(convolver);
  convolver.connect(master);
  master.toDestination();

  // Store references
  audioGraph = {
    master,
    convolver,
    sendBus,
  };
}

export function getSendBus(): Tone.Gain | null {
  return audioGraph?.sendBus || null;
}

export function getMaster(): Tone.Compressor | null {
  return audioGraph?.master || null;
}

export function disposeGraph(): void {
  if (audioGraph) {
    // Disconnect and dispose all nodes
    audioGraph.sendBus.disconnect();
    audioGraph.convolver.disconnect();
    audioGraph.master.disconnect();

    audioGraph.sendBus.dispose();
    audioGraph.convolver.dispose();
    audioGraph.master.dispose();

    audioGraph = null;
  }
}
