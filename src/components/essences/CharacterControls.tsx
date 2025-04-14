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
  // Create array of level options
  const levelOptions = Array.from({ length: 20 }, (_, i) => i + 1);
  
  // Reference for file input
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      <div className="flex items-center gap-2">
        <label htmlFor="character-level" className="text-sm font-medium">
          Character Level:
        </label>
        <select
          id="character-level"
          value={level}
          onChange={(e) => onLevelChange(Number(e.target.value))}
          className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
        >
          {levelOptions.map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={onReset}
          className="flex items-center gap-1 bg-red-700 hover:bg-red-600 px-3 py-1 rounded text-sm"
          title="Reset all selected abilities"
        >
          <RefreshCw size={14} />
          <span>Reset</span>
        </button>
        
        <button
          onClick={onSaveConfig}
          className="flex items-center gap-1 bg-blue-700 hover:bg-blue-600 px-3 py-1 rounded text-sm"
          title="Save configuration to file"
        >
          <Download size={14} />
          <span>Save</span>
        </button>
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1 bg-green-700 hover:bg-green-600 px-3 py-1 rounded text-sm"
          title="Load configuration from file"
        >
          <Upload size={14} />
          <span>Load</span>
        </button>
        
        {/* Hidden file input */}
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
