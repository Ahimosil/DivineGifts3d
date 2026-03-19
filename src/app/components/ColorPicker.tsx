import { useState } from 'react';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string, hexCode?: string) => void;
  onRemove?: () => void;
  showRemove?: boolean;
}

// Predefined popular colors for quick selection
const PRESET_COLORS = [
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#000000' },
  { name: 'Red', hex: '#EF4444' },
  { name: 'Pink', hex: '#EC4899' },
  { name: 'Rose', hex: '#F43F5E' },
  { name: 'Blue', hex: '#3B82F6' },
  { name: 'Sky Blue', hex: '#0EA5E9' },
  { name: 'Green', hex: '#22C55E' },
  { name: 'Yellow', hex: '#EAB308' },
  { name: 'Orange', hex: '#F97316' },
  { name: 'Purple', hex: '#A855F7' },
  { name: 'Gray', hex: '#6B7280' },
  { name: 'Brown', hex: '#92400E' },
  { name: 'Gold', hex: '#FCD34D' },
  { name: 'Silver', hex: '#D1D5DB' },
];

export function ColorPicker({ value, onChange, onRemove, showRemove = true }: ColorPickerProps) {
  const [showPresets, setShowPresets] = useState(false);
  const [customHex, setCustomHex] = useState('#000000');

  // Extract hex code from value if it exists (format: "ColorName (#HEX)")
  const extractHex = (val: string) => {
    const match = val.match(/\(#([A-Fa-f0-9]{6})\)/);
    return match ? `#${match[1]}` : '#000000';
  };

  // Extract color name from value
  const extractName = (val: string) => {
    return val.replace(/\s*\(#[A-Fa-f0-9]{6}\)\s*/, '').trim();
  };

  const currentHex = value ? extractHex(value) : customHex;
  const currentName = value ? extractName(value) : '';

  const handlePresetClick = (preset: typeof PRESET_COLORS[0]) => {
    onChange(`${preset.name} (${preset.hex})`);
    setShowPresets(false);
  };

  const handleCustomColorChange = (hex: string) => {
    setCustomHex(hex);
    const name = currentName || 'Custom';
    onChange(`${name} (${hex})`);
  };

  const handleNameChange = (name: string) => {
    onChange(`${name} (${currentHex})`);
  };

  return (
    <div className="flex items-center gap-2 w-full">
      {/* Color Preview */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setShowPresets(!showPresets)}
          className="w-12 h-12 rounded-lg border-2 border-gray-300 hover:border-pink-500 transition-colors flex items-center justify-center group relative"
          style={{ backgroundColor: currentHex }}
          title="Choose color"
        >
          <Palette className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
        </button>

        {/* Preset Colors Popup */}
        {showPresets && (
          <div className="absolute top-14 left-0 z-50 bg-white rounded-lg shadow-xl border-2 border-gray-200 p-4 w-64">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-gray-900">Quick Colors</h4>
              <button
                type="button"
                onClick={() => setShowPresets(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2 mb-3">
              {PRESET_COLORS.map((preset) => (
                <button
                  key={preset.hex}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 hover:border-pink-500 hover:scale-110 transition-all"
                  style={{ backgroundColor: preset.hex }}
                  title={preset.name}
                />
              ))}
            </div>
            <div className="border-t pt-3">
              <label className="text-xs font-medium text-gray-700 block mb-2">
                Custom Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={currentHex}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                  className="w-12 h-10 rounded border-2 border-gray-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={currentHex}
                  onChange={(e) => handleCustomColorChange(e.target.value)}
                  className="flex-1 px-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="#000000"
                  pattern="^#[A-Fa-f0-9]{6}$"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Color Name Input */}
      <input
        type="text"
        value={currentName}
        onChange={(e) => handleNameChange(e.target.value)}
        placeholder="Color name (e.g., Rose Pink)"
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
      />

      {/* Hex Code Display */}
      <div className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-2 rounded border border-gray-200 w-20 text-center">
        {currentHex}
      </div>

      {/* Remove Button */}
      {showRemove && onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          title="Remove color"
        >
          ×
        </button>
      )}
    </div>
  );
}
