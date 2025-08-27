// Season-based scale selection and state management

import type { Scale } from "./scales";

export type Season = "Winter" | "Spring" | "Summer" | "Autumn";

// Default seasonal scale mapping
export const DEFAULT_PLAN: Record<Season, Scale> = {
  Winter: { rootMidi: 50, mode: "Dorian" }, // D Dorian
  Spring: { rootMidi: 55, mode: "Lydian" }, // G Lydian
  Summer: { rootMidi: 48, mode: "Ionian" }, // C Ionian (Major)
  Autumn: { rootMidi: 57, mode: "Aeolian" }, // A Aeolian (Natural Minor)
};

/**
 * Convert month number to season
 * @param month1to12 - Month number (1=January, 12=December)
 * @returns Corresponding season
 */
export function monthToSeason(month1to12: number): Season {
  // Northern hemisphere seasons
  if (month1to12 >= 12 || month1to12 <= 2) return "Winter";
  if (month1to12 >= 3 && month1to12 <= 5) return "Spring";
  if (month1to12 >= 6 && month1to12 <= 8) return "Summer";
  return "Autumn"; // 9-11
}

/**
 * Pick a scale based on date and seasonal plan
 * @param date - Date to get season for
 * @param plan - Seasonal scale mapping (defaults to DEFAULT_PLAN)
 * @returns Scale for the given date
 */
export function pickScaleForDate(
  date: Date,
  plan: Record<Season, Scale> = DEFAULT_PLAN
): Scale {
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const season = monthToSeason(month);
  return plan[season];
}

// State management for scale selection
interface ScaleState {
  lockedScale: Scale | null;
  followSeasons: boolean;
}

const scaleState: ScaleState = {
  lockedScale: null,
  followSeasons: true,
};

/**
 * Get the current active scale
 * @returns Current scale (locked scale or seasonal scale)
 */
export function getCurrentScale(): Scale {
  if (scaleState.lockedScale && !scaleState.followSeasons) {
    return scaleState.lockedScale;
  }
  return pickScaleForDate(new Date());
}

/**
 * Lock to a specific scale (overrides seasonal following)
 * @param scale - Scale to lock to, or null to unlock
 */
export function lockScale(scale: Scale | null): void {
  scaleState.lockedScale = scale;
  if (scale !== null) {
    scaleState.followSeasons = false;
  }
}

/**
 * Set whether to follow seasonal changes
 * @param follow - True to follow seasons, false to use locked scale
 */
export function setFollowSeasons(follow: boolean): void {
  scaleState.followSeasons = follow;
}

/**
 * Check if currently following seasonal changes
 * @returns True if following seasons, false if using locked scale
 */
export function isFollowingSeasons(): boolean {
  return scaleState.followSeasons;
}
