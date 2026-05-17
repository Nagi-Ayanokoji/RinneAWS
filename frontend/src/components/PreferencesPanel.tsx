import { X } from 'lucide-react';
import { usePreferencesStore } from '../stores/preferencesStore';

export function PreferencesPanel() {
  const { preferences, isOpen, setIsOpen, updatePreferences } = usePreferencesStore();

  if (!isOpen) return null;

  const handleColorChange = (color: string) => {
    updatePreferences({ hud_color: color });
  };

  const handleBgChange = (type: 'solid' | 'gradient' | 'image', value: string) => {
    updatePreferences({ background_type: type, background_value: value });
  };

  const colors = [
    '#00dbe9', '#e9b3ff', '#ffb4ab', '#7df4ff', '#00f0ff', '#e5a9ff'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="glass-panel w-full max-w-md p-6 rounded-2xl relative">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-white/5"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="font-headline-md text-2xl text-on-surface mb-6">HUD Preferences</h2>

        <div className="space-y-6">
          {/* HUD Color */}
          <div>
            <h3 className="font-label-sm text-xs text-on-surface-variant mb-3 uppercase tracking-wider">HUD Color</h3>
            <div className="flex gap-3 flex-wrap">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleColorChange(color)}
                  className={`w-10 h-10 rounded-full transition-all ${preferences.hud_color === color ? 'ring-2 ring-white ring-offset-2 ring-offset-surface scale-110' : 'hover:scale-105 border border-white/20'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Background Type */}
          <div>
            <h3 className="font-label-sm text-xs text-on-surface-variant mb-3 uppercase tracking-wider">Background Mode</h3>
            <div className="flex gap-2 bg-surface/40 p-1 rounded-lg border border-white/5">
              <button
                onClick={() => handleBgChange('solid', '#131315')}
                className={`flex-1 py-2 rounded-md text-sm transition-all ${preferences.background_type === 'solid' ? 'bg-primary/20 text-primary border border-primary/30' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                Solid
              </button>
              <button
                onClick={() => handleBgChange('gradient', 'radial-gradient(circle at 50% 50%, rgba(125, 1, 177, 0.2) 0%, rgba(19, 19, 21, 1) 70%)')}
                className={`flex-1 py-2 rounded-md text-sm transition-all ${preferences.background_type === 'gradient' ? 'bg-primary/20 text-primary border border-primary/30' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                Cyberpunk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
