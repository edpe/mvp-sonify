// Musical modes and scale utilities

export type Mode = "Ionian" | "Dorian" | "Lydian" | "Mixolydian" | "Aeolian";

export interface Scale {
  rootMidi: number;
  mode: Mode;
}

// Pitch class intervals for each mode (semitones from root)
const MODE_INTERVALS: Record<Mode, number[]> = {
  Ionian: [0, 2, 4, 5, 7, 9, 11], // Major scale
  Dorian: [0, 2, 3, 5, 7, 9, 10], // Natural minor with raised 6th
  Lydian: [0, 2, 4, 6, 7, 9, 11], // Major with raised 4th
  Mixolydian: [0, 2, 4, 5, 7, 9, 10], // Major with lowered 7th
  Aeolian: [0, 2, 3, 5, 7, 8, 10], // Natural minor
};

/**
 * Convert a scale degree to MIDI note number
 * @param degree - 1-based scale degree (1=root, 2=second, etc.)
 * @param octaveLane - octave offset from the scale's root octave
 * @param scale - Scale object with root and mode
 * @returns MIDI note number
 */
export function scaleDegreeToMidi(
  degree: number,
  octaveLane: number,
  scale: Scale
): number {
  const intervals = MODE_INTERVALS[scale.mode];
  const degreeIndex = (degree - 1) % intervals.length;
  const octaveOffset = Math.floor((degree - 1) / intervals.length);

  const rootOctave = Math.floor(scale.rootMidi / 12);
  const targetOctave = rootOctave + octaveLane + octaveOffset;

  return targetOctave * 12 + (scale.rootMidi % 12) + intervals[degreeIndex];
}

/**
 * Quantize a MIDI note to the nearest note in the scale
 * @param midiNote - Input MIDI note number
 * @param scale - Scale to quantize to
 * @returns Closest MIDI note in the scale
 */
export function quantizeMidi(midiNote: number, scale: Scale): number {
  const intervals = MODE_INTERVALS[scale.mode];
  const rootPitchClass = scale.rootMidi % 12;
  const inputPitchClass = midiNote % 12;
  const inputOctave = Math.floor(midiNote / 12);

  // Find the closest interval in the scale
  let closestInterval = intervals[0];
  let minDistance = Math.abs(
    inputPitchClass - ((rootPitchClass + intervals[0]) % 12)
  );

  for (const interval of intervals) {
    const scalePitchClass = (rootPitchClass + interval) % 12;
    const distance = Math.min(
      Math.abs(inputPitchClass - scalePitchClass),
      12 - Math.abs(inputPitchClass - scalePitchClass)
    );

    if (distance < minDistance) {
      minDistance = distance;
      closestInterval = interval;
    }
  }

  const targetPitchClass = (rootPitchClass + closestInterval) % 12;
  return inputOctave * 12 + targetPitchClass;
}
