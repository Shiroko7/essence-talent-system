import React from 'react';
import { RefreshCw, Download, Upload } from 'lucide-react';

interface CharacterControlsProps {
  level: number;
  onLevelChange: (level: number) => void;
  onReset: () => void;
  onSaveConfig: () => void;
  onLoadConfig: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CharacterControls: React.FC<CharacterControlsProps> = ({
  level,
  onLevelChange,
  onReset,
  onSaveConfig,
  onLoadConfig
}) => {
  const levelOptions = Array.from({ length: 20 }, (_, i) => i + 1);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      {/* Level Selector */}
      <div className="flex items-center gap-3">
        <label htmlFor="character-level" className="font-display text-sm tracking-wide text-fog">
          Character Level
        </label>
        <select
          id="character-level"
          value={level}
          onChange={(e) => onLevelChange(Number(e.target.value))}
          className="arcane-input py-1.5 px-3 pr-8 text-sm font-display tracking-wide cursor-pointer"
        >
          {levelOptions.map((lvl) => (
            <option key={lvl} value={lvl} className="bg-obsidian">
              {lvl}
            </option>
          ))}
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onReset}
          className="arcane-btn flex items-center gap-2 text-xs !text-essence-fire !border-essence-fire/30 hover:!border-essence-fire hover:!shadow-glow-fire"
          title="Reset all selected abilities"
        >
          <RefreshCw size={14} />
          <span>Reset</span>
        </button>

        <button
          onClick={onSaveConfig}
          className="arcane-btn flex items-center gap-2 text-xs !text-essence-water !border-essence-water/30 hover:!border-essence-water hover:!shadow-glow-water"
          title="Save configuration to file"
        >
          <Download size={14} />
          <span>Save</span>
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="arcane-btn flex items-center gap-2 text-xs !text-essence-wood !border-essence-wood/30 hover:!border-essence-wood hover:!shadow-glow-wood"
          title="Load configuration from file"
        >
          <Upload size={14} />
          <span>Load</span>
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={onLoadConfig}
          className="hidden"
          accept=".json"
        />
      </div>
    </div>
  );
};

export default CharacterControls;
