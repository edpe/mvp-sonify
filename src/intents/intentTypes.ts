export type MovementState =
  | "playing"
  | "cadence"
  | "fermata"
  | "silence"
  | "intro";

export interface DroneIntent {
  kind: "drone";
  whenSec: number;
  chordIdx: number;
  holdSec: number;
}

export interface PatternIntent {
  kind: "pattern";
  whenSec: number;
  density: number;
  subdivision: string;
  mask: number;
}

export interface PhraseIntent {
  kind: "phrase";
  whenSec: number;
  contourId: "riseFall" | "arch" | "meander";
  loudness: number;
}

export type AnyIntent = DroneIntent | PatternIntent | PhraseIntent;
