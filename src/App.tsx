import { useState, useEffect } from "react";
import "./App.css";
import { startAudio } from "./main";
import type { Mode } from "./audio/scales";
import type { Season } from "./audio/seasonMode";
import {
  setFollowSeasons,
  lockScale,
  getCurrentScale,
} from "./audio/seasonMode";

const YEARS = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
const SEASONS: Season[] = ["Winter", "Spring", "Summer", "Autumn"];
const MODES: Mode[] = ["Ionian", "Dorian", "Lydian", "Mixolydian", "Aeolian"];
const ROOT_NOTES = [
  { midi: 48, name: "C" },
  { midi: 50, name: "D" },
  { midi: 52, name: "E" },
  { midi: 53, name: "F" },
  { midi: 55, name: "G" },
  { midi: 57, name: "A" },
  { midi: 59, name: "B" },
];

function App() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [location, setLocation] = useState("");
  const [year, setYear] = useState(YEARS[0]);
  const [season, setSeason] = useState<Season>(SEASONS[0]);
  const [reverb, setReverb] = useState<"Eco" | "Studio">("Eco");

  // Scale/Season mode state
  const [useFixedMode, setUseFixedMode] = useState(false);
  const [selectedMode, setSelectedMode] = useState<Mode>("Ionian");
  const [selectedRoot, setSelectedRoot] = useState(48); // C

  // Update the season mode system when UI changes
  useEffect(() => {
    if (useFixedMode) {
      lockScale({ rootMidi: selectedRoot, mode: selectedMode });
      setFollowSeasons(false);
    } else {
      setFollowSeasons(true);
      lockScale(null);
    }
  }, [useFixedMode, selectedMode, selectedRoot]);

  const handleStartAudio = async () => {
    try {
      await startAudio();
      setAudioStarted(true);
    } catch (error) {
      console.error("Failed to start audio:", error);
    }
  };

  const handleModeToggle = (fixed: boolean) => {
    setUseFixedMode(fixed);
  };

  const currentScale = getCurrentScale();

  return (
    <div className="app-container">
      <button
        className="start-button"
        disabled={audioStarted}
        onClick={handleStartAudio}
      >
        Tap to Start Audio
      </button>
      <form className="form-container" onSubmit={(e) => e.preventDefault()}>
        <div className="form-field">
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
          />
        </div>
        <div className="form-field">
          <label>Year</label>
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Scale/Season Mode Selection */}
        <div className="form-field">
          <label>Scale Mode</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="scaleMode"
                checked={!useFixedMode}
                onChange={() => handleModeToggle(false)}
              />
              Follow seasons
            </label>
            <label>
              <input
                type="radio"
                name="scaleMode"
                checked={useFixedMode}
                onChange={() => handleModeToggle(true)}
              />
              Fixed mode
            </label>
          </div>
        </div>

        {!useFixedMode ? (
          <div className="form-field">
            <label>Season</label>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value as Season)}
            >
              {SEASONS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <>
            <div className="form-field">
              <label>Mode</label>
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value as Mode)}
              >
                {MODES.map((mode) => (
                  <option key={mode} value={mode}>
                    {mode}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-field">
              <label>Root Note</label>
              <select
                value={selectedRoot}
                onChange={(e) => setSelectedRoot(Number(e.target.value))}
              >
                {ROOT_NOTES.map((note) => (
                  <option key={note.midi} value={note.midi}>
                    {note.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* Display current scale info */}
        <div className="form-field">
          <label style={{ fontStyle: "italic", opacity: 0.8 }}>
            Current Scale:{" "}
            {ROOT_NOTES.find((n) => n.midi === currentScale.rootMidi)?.name ||
              "?"}{" "}
            {currentScale.mode}
          </label>
        </div>

        <div className="form-field">
          <label>Reverb Quality</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="reverb"
                value="Eco"
                checked={reverb === "Eco"}
                onChange={() => setReverb("Eco")}
              />
              Eco
            </label>
            <label>
              <input
                type="radio"
                name="reverb"
                value="Studio"
                checked={reverb === "Studio"}
                onChange={() => setReverb("Studio")}
              />
              Studio
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default App;
