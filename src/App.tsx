import { useState } from "react";
import "./App.css";
import { startAudio } from "./main";

const YEARS = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];
const SEASONS = ["Winter", "Spring", "Summer", "Autumn"];

function App() {
  const [audioStarted, setAudioStarted] = useState(false);
  const [location, setLocation] = useState("");
  const [year, setYear] = useState(YEARS[0]);
  const [season, setSeason] = useState(SEASONS[0]);
  const [reverb, setReverb] = useState<"Eco" | "Studio">("Eco");

  const handleStartAudio = async () => {
    try {
      await startAudio();
      setAudioStarted(true);
    } catch (error) {
      console.error("Failed to start audio:", error);
    }
  };

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
        <div className="form-field">
          <label>Season</label>
          <select value={season} onChange={(e) => setSeason(e.target.value)}>
            {SEASONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
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
